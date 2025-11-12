import { Label } from "@/components/ui/label";
import { useState } from "react";
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


export default function SearchEvents({
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
        console.log("🔍 Filtros enviados:", result.data);

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
        onSearch({}); // 🔹 limpa todos filtros no pai
    };


    return (
        <form
            onSubmit={handleSearch}
            className="bg-[#001E78] flex flex-row py-8 px-6 gap-5 rounded-xl place-content-center -translate-y-20">

            <div className="flex flex-col space-y-2">
                <Label htmlFor="title" className="text-xl text-white">
                    Procurar Evento
                </Label>
                <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="bg-transparent border-b outline-none focus:ring-0 text-white placeholder-white/70"
                    id="title"
                    type="text"
                    placeholder="Qualquer Evento"
                />
            </div>

            <div className="flex flex-col space-y-2">
                <Label htmlFor="date" className="text-xl text-white">
                    Data
                </Label>
                <input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="bg-transparent border-b outline-none focus:ring-0 text-white placeholder-white/70"
                    id="date"
                    type="date"
                    placeholder="Qualquer Evento"
                />
            </div>

            <button
                type="submit"
                className="ml-4 text-white font-bold "
            >
                <SearchIcon />
            </button>

            <button
                type="button"
                onClick={handleClear}
                className="ml-2 text-white font-bold "
                title="Limpar filtro"
            >
                <ClearIcon />
            </button>

        </form>

    )
}