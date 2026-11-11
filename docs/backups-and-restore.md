# Stratégie de Sauvegarde & Procédure de Restauration — AFI-L'UE

## 1. Objectifs de Résilience (RPO & RTO)

- **RPO (Recovery Point Objective)** : Moins de 24 heures pour les contenus éditoriaux, moins de 1 heure pour les candidatures en période de rentrée.
- **RTO (Recovery Time Objective)** : Restauration complète des services en moins de 2 heures en cas de sinistre sur le serveur VPS.

---

## 2. Sauvegarde de la Base de Données PostgreSQL

Sur le VPS Contabo hébergeant l'instance Supabase ou PostgreSQL autonome :

### 2.1. Script de Sauvegarde Automatisée (`backup_db.sh`)
```bash
#!/bin/bash
# Sauvegarde quotidienne PostgreSQL AFI-L'UE
BACKUP_DIR="/var/backups/afi_website"
TIMESTAMP=$(date +"%Y%m%d_%H%M%S")
DB_NAME="postgres"
CONTAINER_NAME="supabase-db"

mkdir -p "$BACKUP_DIR"

# Dump compressé de la base de données
docker exec -t "$CONTAINER_NAME" pg_dump -U postgres -d "$DB_NAME" -F c > "$BACKUP_DIR/db_afi_${TIMESTAMP}.dump"

# Conservation des 30 derniers jours
find "$BACKUP_DIR" -type f -name "db_afi_*.dump" -mtime +30 -delete

echo "Sauvegarde PostgreSQL terminée avec succès : db_afi_${TIMESTAMP}.dump"
```

### 2.2. Automatisation via Cron
Ajouter dans le crontab du serveur (`crontab -e`) :
```cron
# Exécution chaque nuit à 02h00 UTC
0 2 * * * /root/scripts/backup_db.sh >> /var/log/afi_backup.log 2>&1
```

---

## 3. Sauvegarde des Médias & Documents

Les fichiers téléversés dans Supabase Storage (dossiers de candidatures et médias CMS) situés sur le volume Docker dédié :
```bash
# Sauvegarde incrémentielle rsync vers un stockage distant ou S3
rsync -avz /var/lib/docker/volumes/supabase_storage_data/_data/ backup-server:/backups/afi_media/
```

---

## 4. Procédure de Restauration Testée

En cas d'incident critique nécessitant la restauration de la base :

1. **Arrêter l'application Next.js** pour éviter les écritures concurrentes pendant la restauration :
   ```bash
   docker stop afi-website
   ```

2. **Restaurer le dump PostgreSQL** :
   ```bash
   # Création d'une base de secours ou restauration directe
   docker exec -i supabase-db pg_restore -U postgres -d postgres --clean --if-exists < /var/backups/afi_website/db_afi_XXXXXX.dump
   ```

3. **Vérifier l'intégrité des tables clés** :
   ```bash
   docker exec -it supabase-db psql -U postgres -d postgres -c "SELECT count(*) FROM formations;"
   docker exec -it supabase-db psql -U postgres -d postgres -c "SELECT count(*) FROM candidatures;"
   ```

4. **Redémarrer l'application web** :
   ```bash
   docker start afi-website
   ```

5. **Tester la sonde de santé** :
   ```bash
   curl -I https://afi-ue.sn/api/health
   # Réponse attendue : HTTP 200 OK avec status "healthy"
   ```
