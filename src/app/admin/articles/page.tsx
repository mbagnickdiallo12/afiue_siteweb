import {
  getAllArticlesAdmin,
  getAllCategoriesAdmin,
} from "@/lib/services/articles.service";
import { ArticlesAdminManager } from "@/components/admin/ArticlesAdminManager";

export const metadata = {
  title: "Gestion des Articles & Blog | Administration AFI-L'UE",
};

export default async function AdminArticlesPage() {
  const [articles, categories] = await Promise.all([
    getAllArticlesAdmin(),
    getAllCategoriesAdmin(),
  ]);

  return (
    <ArticlesAdminManager
      initialArticles={articles}
      initialCategories={categories}
    />
  );
}
