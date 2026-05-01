import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import {prisma} from "@/lib/prisma";

//const DB_PATH = path.join(process.cwd(), 'db.json');

//function readDB() {
//    const data = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
//    return data;
//}

//function writeDB(data: any) {
//    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2));
//}

export async function GET() {
    //const db = readDB();
    const projects = await prisma.project.findMany({
        orderBy: { createdAt: 'desc' }
    });
    return NextResponse.json(projects);
}

export async function POST(request: Request) {
    //const body = await request.json();
    //const db = readDB();
    //const newProject = {
    //    id: String(Date.now()),
    //    name: body.name,
    //    color: body.color,
    //};
    //db.projects.push(newProject);
    //writeDB(db);
    const { name, color } = await request.json();
    const project = await prisma.project.create({
        data: { name, color }
    });
    return NextResponse.json(project, { status: 201 });
}
export async function PUT(request: Request) {
    //const body = await request.json();
    //const db = readDB();
    //const newProject = {
    //    id: String(Date.now()),
    //    name: body.name
    //};
    //db.projects.update(newProject, { where: { id: String(Date.now()) } });
    //writeDB(db);
    //return NextResponse.json(db);
}