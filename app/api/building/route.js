import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET(){
    try{

        const buildings = await prisma.building.findMany({
            where: {published: true},
      
        })
        return NextResponse.json({
            building: buildings,
            message: "Data succesfully uploaded"
        },{status: 201})
    }catch(err){
       return NextResponse.json({
        building: null,
        message: 'error: ' + err
       },{status: 500})
    }
  
}