import { getAllStudentLifeAdmin } from "@/lib/services/student-life.service";
import StudentLifeAdminManager from "@/components/admin/StudentLifeAdminManager";

export const dynamic = "force-dynamic";

export default async function AdminStudentLifePage() {
  const items = await getAllStudentLifeAdmin();
  return <StudentLifeAdminManager initialItems={items} />;
}

