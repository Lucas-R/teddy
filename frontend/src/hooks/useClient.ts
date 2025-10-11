import { useEffect, useState } from "react";
import type { LoginProps } from "@/schemas/LoginSchema";

export default function useClient() {
    const [user, setUser] = useState<LoginProps | null>(null);
    const [selectedList, setSelectedList] = useState<number[]>([]);

    useEffect(() => {
        const local = localStorage.getItem("user");

        if(local) {
            const data = JSON.parse(local);
            setUser(data);
            setSelectedList(data.selected);
        }
    }, []);

    useEffect(() => {
        setUser(prev => {
            if(!prev) return prev;
            const updated = { ...prev, selected: selectedList };
            localStorage.setItem("user", JSON.stringify(updated));
            return updated;
        });
    }, [selectedList]);

    function add(id: number) {
        setSelectedList((prev) => (prev.includes(id) ? prev : [...prev, id]));
    };

    function remove(id: number) {
        setSelectedList((prev) => prev.filter((item) => item !== id));
    };

    function clear() {
        setSelectedList([]);
    }

    function included(id: number) {
        return user?.selected?.includes(id) || false;
    }

    return { add, remove, clear, included, selectedList }
}