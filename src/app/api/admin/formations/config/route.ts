import { NextResponse } from "next/server";
import { readCmsStore, writeCmsStore } from "@/lib/services/cms-store";

export async function GET() {
  try {
    const store = readCmsStore();
    return NextResponse.json({
      success: true,
      data: {
        domains: store.domains_config || [],
        grades: store.grades_config || [],
        pricingGrids: store.pricing_grids_config || [],
      },
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
    const store = readCmsStore();

    if (body.domains) {
      store.domains_config = body.domains;
    }
    if (body.grades) {
      store.grades_config = body.grades;
    }
    if (body.pricingGrids) {
      store.pricing_grids_config = body.pricingGrids;
    }

    writeCmsStore(store);

    return NextResponse.json({
      success: true,
      data: {
        domains: store.domains_config,
        grades: store.grades_config,
        pricingGrids: store.pricing_grids_config,
      },
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

