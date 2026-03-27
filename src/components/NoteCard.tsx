import { useState } from "react";
import type { Note } from "./NotesScreen";

type NoteCardProps = {
  note: Note;
  onDelete: (id: number) => void;
  onEdite: (id: number, newTitle: string, newDescr: string) => void;
};

export default function NoteCard({ note, onDelete, onEdite }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(note.title);
  const [editDescr, setEditDescr] = useState(note.description);

  const handleSave = () => {
    onEdite(note.id, editTitle, editDescr);
    setIsEditing(false);
  };

  return (
    <div className=" bg-white p-5 rounded-3xl shadow-sm flex justify-between items-start">
      {isEditing ? (
        <div className=" flex-1 w-full mr-4">
          <input
            type="text"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
            className=" w-full font-bold text-lg mb-2 outline-none border-b border-gray-200 bg-transparent"
          />
          <textarea
            onChange={(e) => setEditDescr(e.target.value)}
            value={editDescr}
            rows={2}
            className=" w-full text-gray-600 outline-none resize-none border-b border-gray-200 bg-transparent"
          />

          <div className=" flex gap-2 mt-3">
            <button
              onClick={handleSave}
              className=" w-full bg-gray-100 text-black font-semibold py-3 rounded-xl hover:bg-gray-200 transition-colors"
            >
              Save
            </button>

            <button
              onClick={() => setIsEditing(false)}
              className=" flex-1 bg-gray-100 text-black font-semibold p-3 rounded-2xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
          <div className=" flex-1">
            <h3 className=" font-semibold text-lg text-gray-900 leading-snug">
              {note.title}
            </h3>
            <p className=" text-gray-500 mt-1 text-sm leading-relaxed">
              {note.description}
            </p>
          </div>

          <div className="  flex items-center">
            <button
              onClick={() => setIsEditing(true)}
              className=" text-gray-300 hover:text-red-500 font-bold ml-4 p-1 hover:scale-105"
            >
              ✏️
            </button>

            <button
              onClick={() => onDelete(note.id)}
              className=" text-gray-300 hover:text-red-500 font-bold ml-4 p-1"
            >
              ✕
            </button>
          </div>
        </>
      )}
    </div>
  );
}
