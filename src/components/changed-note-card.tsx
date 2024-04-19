import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import { ChangeEvent, FormEvent, useState } from "react";
import { toast } from "sonner";
import { Note } from "../types/note";

interface ChangedNoteCardProps {
  note: Note;
  onNoteChanged: (id: string, content: string) => void;
}

export function ChangedNoteCard({ note, onNoteChanged }: ChangedNoteCardProps) {
  const [content, setContent] = useState(note.content ?? "");

  function handleSaveNote(event: FormEvent) {
    if (content === "") {
      event.preventDefault();
      toast.error("Adicione conteúdo antes de salvar a nota!");
      return;
    }

    onNoteChanged(note.id, content);
    setContent("");

    toast.success("Nota Atualizada com sucesso!");
  }

  function handleContentChanged(event: ChangeEvent<HTMLTextAreaElement>) {
    setContent(event.target.value);
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="w-full bg-slate-800 py-3 text-center text-sm text-slate-300 outline-none font-medium group hover:opacity-80"
        >
          Deseja <span className="text-green-400 group-hover:underline">editar essa nota</span>?
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-[640px] w-full md:h-[60vh] bg-slate-700 md:rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 rounded-bl-md text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <form className="flex-1 flex flex-col">
            <div className="flex flex-1 flex-col gap-3 p-5">
              <span className="text-sm font-medium text-slate-300">Atualizar nota</span>

              <textarea
                autoFocus
                className="text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none"
                onChange={handleContentChanged}
                value={content}
              />
            </div>

            <Dialog.Close asChild>
              <button
                type="button"
                onClick={handleSaveNote}
                className="w-full bg-lime-400 py-3 text-center text-sm text-lime-950 outline-none font-medium hover:bg-lime-500"
              >
                Salvar nota
              </button>
            </Dialog.Close>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
