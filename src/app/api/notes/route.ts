import { NextResponse } from "next/server";
import prisma from '@/lib/prisma';
import { Note } from "@/src/app/types/note";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const noteId = searchParams.get("id");

        if (noteId) {
            const note = await prisma.note.findUnique({
                where: { id: parseInt(noteId) },
            });

            if (!note) {
                return NextResponse.json({ error: 'Бележката не е намерена' }, { status: 404 });
            }

            return NextResponse.json(note, { status: 200 });
        } else {
            const notes = await prisma.note.findMany();
            return NextResponse.json(notes, { status: 200 });
        }
    } catch (error) {
        return NextResponse.json({ error: 'Грешка при зареждане на бележките' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const { title, author, body, }: Note = await request.json();

        if (!title || !body || !author) {
            return NextResponse.json({ error: 'Заглавието и съдържанието са задължителни!' }, { status: 400 });
        }

        const newNote = await prisma.note.create({
            data: {
                title,
                author,
                body,
            },
        });

        return NextResponse.json(newNote, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Възникна грешка при създаването на бележката.' }, { status: 500 });
    }
}

export async function PUT(req: Request) {

    const { id, title, body } = await req.json();

    if (!id || typeof id !== 'number') {
        return NextResponse.json({ error: 'Невалидно ID' }, { status: 400 });
    }

    if (!title || !body) {
        return NextResponse.json({ error: 'Заглавие, съдържание са задължителни' }, { status: 400 });
    }
    try {
        const noteExists = await prisma.note.findUnique({
            where: { id: id },
        });

        if (!noteExists) {
            return NextResponse.json({ error: 'Бележката не e намерена' }, { status: 404 });
        }

        const updatedNote = await prisma.note.update({
            where: { id: id },
            data: { title, body },
        });

        return NextResponse.json(updatedNote, { status: 200 });
    } catch (error) {
        console.error('Грешка при актуализиране на бележката:', error);
        return NextResponse.json({ error: 'Неуспешно актуализиране на бележката' }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const { id } = await req.json();

        if (!id || isNaN(Number(id))) {
            return NextResponse.json({ error: "Невалидно ID" }, { status: 400 });
        }

        const intId = Number(id);

        const existingNote = await prisma.note.findUnique({
            where: { id: intId }
        });

        if (!existingNote) {
            return NextResponse.json({ error: "Бележката не e намерена" }, { status: 404 });
        }

        await prisma.note.delete({
            where: { id: intId }
        });

        return NextResponse.json({ message: "Бележката e изтрита успешно" }, { status: 200 });

    } catch (error) {
        console.error("Грешка при изтриване:", error);
        return NextResponse.json({ error: "Системна грешка" }, { status: 500 });
    }
}
