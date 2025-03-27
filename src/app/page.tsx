'use client';
import React, { useState, useEffect } from 'react';
import { Note } from "@/src/app/types/note";

const Page = () => {
  const [showForm, setShowForm] = useState(false);
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [editingNote, setEditingNote] = useState<number | null>(null);
  const [note, setNote] = useState<Note>({ title: '', body: '', author: '' });

  useEffect(() => {
    fetchNotes();
  }, []);

  async function fetchNotes() {
    try {
      const response = await fetch('/api/notes');
      const data = await response.json();
      setNotes(data);
    } catch (error) {
      console.error('Грешка при зареждане на бележките:', error);
    }
  }

  async function saveNote() {
    try {
      const response = await fetch('/api/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(note),
      });

      if (!response.ok) {
        throw new Error('Неуспешно създаване на бележка');
      }

      fetchNotes();
      setShowForm(false);
      setNote({ title: '', body: '', author: '' });
    } catch (error) {
      console.error('Грешка:', error);
    }
  }

  function handleEdit(note: Note) {
    setEditingNote(Number(note.id));
    setNote({ title: note.title, body: note.body, author: note.author });
  }

  async function updateNote() {
    if (editingNote) {
      try {
        const response = await fetch(`/api/notes/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: editingNote, ...note }),
        });

        if (!response.ok) {
          throw new Error('Грешка при редактиране на бележката');
        }

        fetchNotes();
        setEditingNote(null);
        setNote({ title: '', body: '', author: '' });
      } catch (error) {
        console.error('Грешка:', error);
      }
    }
  }

  async function deleteNote(id: number) {
    try {
      const response = await fetch(`/api/notes`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });

      if (!response.ok) {
        throw new Error('Грешка при изтриване на бележката');
      }

      setNotes((prevNotes) => prevNotes.filter((note) => note.id !== id));
    } catch (error) {
      console.error('Грешка:', error);
    }
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const { name, value } = e.target;
    setNote((prevNote) => ({ ...prevNote, [name]: value }));
  }

  return (
    <div className="container py-5">
      <h1 className="text-center mb-4 fw-bold" style={{ color: ' #808080' }}>Notes</h1>

      {(showForm || editingNote) && (
        <div className="card bg-secondary text-white p-3 mb-4">
          <div className="card-body">
            <h5 className="card-title">{editingNote ? 'Edit note' : 'New note'}</h5>
            <input
              type="text"
              className="form-control mb-3"
              name="title"
              value={note.title}
              onChange={handleChange}
              placeholder="Title"
            />
            <textarea
              className="form-control mb-3"
              name="body"
              value={note.body}
              onChange={handleChange}
              placeholder="Content"
              rows={2}
            ></textarea>

            {!editingNote && (
              <input
                type="text"
                className="form-control mb-3"
                name="author"
                value={note.author}
                onChange={handleChange}
                placeholder="Author"
              />
            )}

            <div className="d-flex justify-content-end">
              <button
                className="btn btn-secondary me-2"
                onClick={() => {
                  setShowForm(false);
                  setEditingNote(null);
                }}
              >
                Cancel
              </button>
              <button className="btn btn-success"
                onClick={editingNote ? updateNote : saveNote}
                disabled={!note.title || !note.body || !note.author}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )
      }

      <div className="list-group">
        {notes.map((note) => (
          <div key={note.id} className="list-group-item list-group-item-action w-50 mx-auto">
            <h5
              onClick={() => setSelectedNoteId(selectedNoteId === note.id ? null : Number(note.id))}
              style={{ cursor: 'pointer' }}
            >
              {note.title}
            </h5>
            {selectedNoteId === note.id && (
              <div className="mt-2">
                <p>{note.body}</p>
                <small className="text-muted">Author: {note.author}</small>
                <div className="d-flex justify-content-between mt-3">
                  <button onClick={() => handleEdit(note)} className="btn btn-warning me-2">
                    Edit
                  </button>
                  <button onClick={() => deleteNote(Number(note.id))} className="btn btn-danger">
                    Remove
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="d-flex justify-content-center">
        <button
          className="btn mb-4 mt-4"
          style={{ backgroundColor: '#808080', color: 'white' }}
          onClick={() => setShowForm(true)}
        >
          Add new note
        </button>
      </div>
    </div >
  );
};

export default Page;
