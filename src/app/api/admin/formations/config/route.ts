import { NextResponse } from "next/server";
import { revalidatePath } from "next/cache";
import {
  getAcademicConfigAdmin,
  updateAcademicConfigAdmin,
} from "@/lib/services/formations.service";

export async function GET() {
  try {
    const config = await getAcademicConfigAdmin();
    return NextResponse.json({
      success: true,
      data: config,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const updated = await updateAcademicConfigAdmin({
      domains: body.domains,
      grades: body.grades,
      pricingGrids: body.pricingGrids,
    });

    revalidatePath("/", "layout");

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
