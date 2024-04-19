import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

interface DeleteNoteCardProps {
  id: string;
  onNoteDeleted: (id: string) => void;
}

export function DeleteNoteCard({ id, onNoteDeleted }: DeleteNoteCardProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="w-full bg-slate-800 py-3 text-center text-sm text-slate-300 outline-none font-medium group hover:opacity-80"
        >
          Deseja <span className="text-red-400 group-hover:underline">apagar essa nota</span>?
        </button>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="inset-0 fixed bg-black/50" />
        <Dialog.Content className="fixed overflow-hidden inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:max-w-md w-full md:min-h-28 bg-slate-700 md:rounded-md flex flex-col outline-none">
          <Dialog.Close className="absolute right-0 top-0 bg-slate-800 p-1.5 rounded-bl-md text-slate-400 hover:text-slate-100">
            <X className="size-5" />
          </Dialog.Close>

          <div className="p-3 w-full flex flex-col gap-2">
            <Dialog.Title className="text-base">Deletar Nota</Dialog.Title>
            <Dialog.Description className="text-slate-400 text-sm">
              Você está prestes a excluir uma nota. Tem certeza de que deseja prosseguir? Esta é uma ação irreversível e
              a informação será permanentemente removida do sistema.
            </Dialog.Description>
            <div className="flex w-full justify-end">
              <Dialog.Close asChild>
                <button
                  onClick={() => onNoteDeleted(id)}
                  className="inline-flex px-3 py-1.5 bg-red-700 rounded-md hover:opacity-80"
                >
                  Confirmar
                </button>
              </Dialog.Close>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
