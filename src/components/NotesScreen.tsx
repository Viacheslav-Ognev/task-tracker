import { useState, useEffect } from "react";
import NoteCard from "./NoteCard";

export type Note = {
  id: number;
  title: string;
  description: string;
};

export default function NotesScreen() {
  const [notes, setNote] = useState<Note[]>(() => {
    const saveNotes = localStorage.getItem("notes");
    if (saveNotes) return JSON.parse(saveNotes);
    return [];
  });

  useEffect(() => {
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  const [isCreating, setIsCreating] = useState(false);
  const [titleValue, setTitleValue] = useState("");
  const [descriptionValue, setDescValue] = useState("");

  const handleAddNote = () => {
    if (titleValue.trim() === "") return;

    const newNote: Note = {
      id: Date.now(),
      title: titleValue,
      description: descriptionValue,
    };

    setNote([...notes, newNote]);
    setTitleValue("");
    setDescValue("");
    setIsCreating(false);
  };

  const handleDeleteNote = (idToRemove: number) => {
    setNote(notes.filter((note) => note.id !== idToRemove));
  };

  const handleEditeNote = (id: number, title: string, description: string) => {
    const editeNote = notes.map((note) => {
      if (note.id === id) {
        return { ...note, title: title, description: description };
      }
      return note;
    });
    setNote(editeNote);
  };

  return (
    <div className=" min-h-screen bg-[#F2F2F7] pt-12 px-5 pb-32">
      <h1 className=" text-3xl font-bold text-black mb-12 tracking-tight w-full text-left">
        Notes
      </h1>

      <div className=" flex flex-col gap-3 ">
        {notes.map((note) => (
          <NoteCard
            key={note.id}
            note={note}
            onDelete={handleDeleteNote}
            onEdite={handleEditeNote}
          />
        ))}
      </div>

      <div className=" mt-4">
        {isCreating ? (
          <div className=" bg-white p-5 rounded-3xl shadow-sm ">
            <input
              type="text"
              placeholder="Title..."
              value={titleValue}
              onChange={(e) => setTitleValue(e.target.value)}
              className=" w-full font-bold text-lg mb-2 outline-none placeholder-gray-400 border-b border-gray-200"
            />
            <textarea
              placeholder="Note description..."
              value={descriptionValue}
              onChange={(e) => setDescValue(e.target.value)}
              className=" w-full text-gray-600 resize-none outline-none placeholder-gray-400 border-b border-gray-200"
              rows={3}
            />

            <div className=" flex gap-2 mt-4">
              <button
                onClick={handleAddNote}
                className=" flex-1 bg-black text-white font-semibold py-3 rounded-2xl hover:bg-gray-800 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsCreating(false);
                }}
                className=" flex-1 bg-gray-100 text-black font-semibold py-3 rounded-2xl hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setIsCreating(true)}
            className=" bg-black text-white  px-12 w-full font-semibold py-4 rounded-3xl shadow-sm hover:bg-black/90 hover:scale-102 transition-transform"
          >
            + New Note
          </button>
        )}
      </div>
    </div>
  );
}
