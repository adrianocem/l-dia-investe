import { supabase } from './supabase';

export interface CustomBank {
    id: string;
    name: string;
    isBroker: boolean;
    isConglomerate: boolean;
    isTitle: boolean;
    createdAt: string;
}

export async function fetchCustomBanks(): Promise<CustomBank[]> {
    const { data, error } = await supabase
        .from('custom_banks')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Erro ao buscar itens customizados:', error);
        return [];
    }

    return data?.map(row => ({
        id: row.id,
        name: row.name,
        isBroker: row.is_broker || false,
        isConglomerate: row.is_conglomerate || false,
        isTitle: row.is_title || false,
        createdAt: row.created_at,
    })) || [];
}

export async function addCustomBank(
    name: string,
    isBroker: boolean = false,
    isConglomerate: boolean = false,
    isTitle: boolean = false
): Promise<CustomBank | null> {
    const { data, error } = await supabase
        .from('custom_banks')
        .insert({
            name: name.trim(),
            is_broker: isBroker,
            is_conglomerate: isConglomerate,
            is_title: isTitle
        })
        .select()
        .single();

    if (error) {
        console.error('Erro ao adicionar item customizado:', error);
        return null;
    }

    return data ? {
        id: data.id,
        name: data.name,
        isBroker: data.is_broker,
        isConglomerate: data.is_conglomerate,
        isTitle: data.is_title,
        createdAt: data.created_at,
    } : null;
}

export async function deleteCustomBank(id: string): Promise<boolean> {
    const { error } = await supabase
        .from('custom_banks')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Erro ao deletar banco customizado:', error);
        return false;
    }

    return true;
}
