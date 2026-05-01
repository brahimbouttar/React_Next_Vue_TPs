// app/api/projects/[id]/route.ts

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

// GET /api/projects/:id
export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const project = await prisma.project.findUnique({
        where: { id: numericId }
    });

    if (!project) {
        return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    return NextResponse.json(project);
}


// PUT /api/projects/:id
export async function PUT(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    const { name, color } = await request.json();

    try {
        const updatedProject = await prisma.project.update({
            where: { id: numericId },
            data: { name, color }
        });

        return NextResponse.json(updatedProject);
    } catch {
        return NextResponse.json(
            { error: 'Project not found or update failed' },
            { status: 404 }
        );
    }
}


// DELETE /api/projects/:id
export async function DELETE(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const { id } = await params;
    const numericId = Number(id);

    if (isNaN(numericId)) {
        return NextResponse.json({ error: 'Invalid ID' }, { status: 400 });
    }

    try {
        await prisma.project.delete({
            where: { id: numericId }
        });

        return NextResponse.json({ message: 'Project deleted' });
    } catch {
        return NextResponse.json(
            { error: 'Project not found or delete failed' },
            { status: 404 }
        );
    }
}