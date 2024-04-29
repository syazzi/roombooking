import prisma from "@/lib/prisma";
import { hash } from "bcrypt";

const { NextResponse } = require("next/server");

export async function POST(req){
    try{
        const body = await req.json();
        const { email, firstname, lastname, regNo, password, phoneNo, ficId} = body;

        const existingUserByEmail = await prisma.user.findUnique({
            where: {email: email}
        });

        if(existingUserByEmail) {
            return NextResponse.json({user: null, message: "user existed with this email"}, {status: 409})
        }

        const existingUserByRegNo = await prisma.user.findUnique({
            where: {regNo: regNo}
        });

        if(existingUserByRegNo) {
            return NextResponse.json({user: null, message: "user existed with registration Number"}, {status: 409})
        }

        const existingUserByPhoneNo = await prisma.user.findUnique({
            where: {phoneNo: phoneNo}
        });

        if(existingUserByPhoneNo) {
            return NextResponse.json({user: null, message: "user existed with this Phone Number"}, {status: 409})
        }


        // above is to search if user exist or not

        // below create user if non of the above existed
        const hashedpassword = await hash(password, 10);

        const newUser = await prisma.user.create({
            data: {
                firstname,
                lastname,
                email,
                regNo,
                password: hashedpassword,
                phoneNo,
                ficId
            }
        })

        const {password: newUserPassword, ...rest} = newUser;

        
        return NextResponse.json({
            user: rest,
            message: "User Created Successfully"
        },
        {status: 201});
    }catch(err){
        console.log(err);
    }
}

