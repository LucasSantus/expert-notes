import { ChangeEvent, useState } from "react";
import { toast } from "sonner";
import { useLocalStorage } from "usehooks-ts";
import logo from "./assets/logo.svg";
import { NewNoteCard } from "./components/new-note-card";
import { NoteCard } from "./components/note-card";
import { KEY_LOCAL_STORAGE_NOTES } from "./constants/globals";
import { Note } from "./types/note";

export function App(): JSX.Element {
  const [notesOnStorage, setNotesOnStorage] = useLocalStorage<Note[]>(KEY_LOCAL_STORAGE_NOTES, []);

  const [search, setSearch] = useState<string>("");
  const [notes, setNotes] = useState<Note[]>(() => {
    if (notesOnStorage) return notesOnStorage;

    return [];
  });

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    };

    const notesArray = [newNote, ...notes];

    setNotes(notesArray);
    setNotesOnStorage(notesArray);
  }

  function onNoteChanged(id: string, content: string) {
    const notesArray = notes.filter((note) => note.id !== id);

    const note: Note = {
      id,
      content,
      date: new Date(),
    };

    const notesChanged = [note, ...notesArray];

    setNotes(notesChanged);
    setNotesOnStorage(notesChanged);

    toast.success("Nota atualizada com sucesso!");
  }

  function onNoteDeleted(id: string) {
    const notesArray = notes.filter((note) => note.id !== id);

    setNotes(notesArray);
    setNotesOnStorage(notesArray);

    toast.success("Nota apagada com sucesso!");
  }

  function handleSearch(event: ChangeEvent<HTMLInputElement>) {
    const query = event.target.value;

    setSearch(query);
  }

  const filteredNotes =
    search !== ""
      ? notes.filter((note) => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
      : notes;

  return (
    <div className="mx-auto max-w-6xl py-8 space-y-6 px-5">
      <img src={logo} alt="NLW Expert" />

      <form className="w-full">
        <input
          type="text"
          placeholder="Busque em suas notas..."
          className="w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-state-500"
          onChange={handleSearch}
        />
      </form>

      <div className="h-px bg-slate-700" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[250px]">
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotes.map((note) => {
          return <NoteCard onNoteChanged={onNoteChanged} onNoteDeleted={onNoteDeleted} key={note.id} note={note} />;
        })}
      </div>
    </div>
  );
}
