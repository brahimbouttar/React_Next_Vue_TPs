'use server';

import { revalidatePath } from 'next/cache';
import { prisma } from '@/lib/prisma';
// ADD
export async function addProject(formData: FormData) {
    const name = formData.get('name') as string;
    const color = formData.get('color') as string;
    await prisma.project.create({ data: { name, color } });
    revalidatePath('/dashboard');
}
// RENAME
export async function renameProject(formData: FormData) {
    const id = Number(formData.get('id'));
    const name = formData.get('name') as string;

    if (isNaN(id) || !name) {
        throw new Error('Invalid input');
    }

    await prisma.project.update({
        where: { id },
        data: { name }
    });

    revalidatePath('/dashboard');
}


// DELETE
export async function deleteProject(formData: FormData) {
    const id = Number(formData.get('id'));

    if (isNaN(id)) {
        throw new Error('Invalid ID');
    }

    await prisma.project.delete({
        where: { id }
    });

    revalidatePath('/dashboard');
}