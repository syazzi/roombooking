import prisma from "@/lib/prisma";
import { compare } from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(request){
    const body = await request.json();
    const { email, password} = body;


    const user = await prisma.user.findFirst({
        where: {
            email: email
        },
        include: {
            userHasRole: true,
        }
    })

    console.log(user);

    // check if password match or not
    const checkPassword = await compare(password, user.password)
    // if password does not match return nextresponse

    if(!checkPassword){
        return NextResponse.json({
            user: null,
            message: 'Password does not match'
        },{status: 403})
    }

    if(user && (await compare(password, user.password))){
        const {password, ...rest} = user;
        return NextResponse.json({
            user: rest,
            message: "User Logged In Successfully"
        },
        {status: 201});
    }
    else{
        return NextResponse.json({
            user: null,
            message: "Error"
        },
        {status: 500});
    }
}