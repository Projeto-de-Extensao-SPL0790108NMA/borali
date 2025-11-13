import { Label } from "@/components/ui/label";
import { memo, useState } from "react";
import z from "zod";
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

const searchSchema = z.object({
    title: z
        .string()
        .transform((val) => (val.trim() === "" ? undefined : val))
        .optional(),
    date: z
        .string()
        .transform((val) => (val.trim() === "" ? undefined : val))
        .optional(),
});


function SearchEventsComponent({
    onSearch,
}: {
    onSearch: (filters: { title?: string; date?: string }) => void;
}) {
    const [title, setTitle] = useState('');
    const [date, setDate] = useState("");
    const [error, setError] = useState<string | null>(null);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();

        const result = searchSchema.safeParse({ title, date });


        if (!result.success) {
            const firstError =
                result.error.flatten().formErrors[0] ||
                result.error.flatten().fieldErrors.title?.[0] ||
                result.error.flatten().fieldErrors.date?.[0];
            setError(firstError || "Erro desconhecido");
            return;
        }

        setError(null);
        onSearch(result.data);
    };
    const handleClear = () => {
        setTitle("");
        setDate("");
        setError(null);
        onSearch({});
    };


    return (
        <form
            onSubmit={handleSearch}
            className="bg-[#001E78] flex flex-col md:flex-row py-6 md:py-12 px-4 md:px-24 gap-4 md:gap-5 rounded-xl place-content-center w-full max-w-4xl mx-auto -translate-y-10 md:-translate-y-20">

            <div className="flex flex-col space-y-2 flex-1">
                <Label htmlFor="title" className="text-base md:text-xl text-white">
                    Procurar Evento
                </Label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-transparent border-b outline-none focus:ring-0 text-white placeholder-white/70 text-sm md:text-base"
                    id="title"
                    type="text"
                    placeholder="Qualquer Evento"
                />
            </div>

            <div className="flex flex-col space-y-2 flex-1">
                <Label htmlFor="date" className="text-base md:text-xl text-white">
                    Data
                </Label>
                <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent border-b outline-none focus:ring-0 text-white placeholder-white/70 text-sm md:text-base"
                    id="date"
                    type="date"
                    placeholder="Qualquer Evento"
                />
            </div>

            <div className="flex items-end gap-2 md:ml-4">
                <button
                    type="submit"
                    className="text-white font-bold p-2 hover:opacity-80 transition-opacity"
                    aria-label="Buscar"
                >
                    <SearchIcon />
                </button>

                <button
                    type="button"
                    onClick={handleClear}
                    className="text-white font-bold p-2 hover:opacity-80 transition-opacity"
                    title="Limpar filtro"
                    aria-label="Limpar filtro"
                >
                    <ClearIcon />
                </button>
            </div>

        </form>

    )
}

export const SearchEvents = memo(SearchEventsComponent);