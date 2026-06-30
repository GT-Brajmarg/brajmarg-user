// lib/repositories/product.repository.ts

import { createClient } from "@/lib/supabase/server";

//
// ================================
// FRAME
// ================================
//

export async function getTempleFramesRepository(templeId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("frame_items")
    .select("*")
    .eq("temple_id", templeId)
    .eq("in_stock", true)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function getFrameDetailsRepository(frameId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("frame_items")
    .select(
      `
      *,
      temples (
        id,
        name,
        location,
        image_url
      )
    `,
    )
    .eq("id", frameId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getFrameSizesRepository(frameId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("frame_size_options")
    .select("*")
    .eq("frame_item_id", frameId)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function getFrameMaterialsRepository(frameId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("frame_material_options")
    .select("*")
    .eq("frame_item_id", frameId)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function createFrameOrderRepository(payload: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("frame_orders")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

//
// ================================
// CLOTH
// ================================
//

export async function getTempleClothsRepository(templeId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cloth_items")
    .select("*")
    .eq("temple_id", templeId)
    .eq("in_stock", true)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function getClothDetailsRepository(clothId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cloth_items")
    .select(
      `
      *,
      temples (
        id,
        name,
        location,
        image_url
      )
    `,
    )
    .eq("id", clothId)
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function getClothSizesRepository(clothId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cloth_size_options")
    .select("*")
    .eq("cloth_item_id", clothId)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function getClothColorsRepository(clothId: string) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cloth_color_options")
    .select("*")
    .eq("cloth_item_id", clothId)
    .order("display_order", {
      ascending: true,
    });

  if (error) {
    throw error;
  }

  return data;
}

export async function createClothOrderRepository(payload: any) {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("cloth_orders")
    .insert(payload)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}
