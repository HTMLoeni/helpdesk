import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Missing Supabase credentials. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env'
  )
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

const TABLE = 'pengaduan'

export const supabaseApi = {
  async getAll() {
    const { data, error } = await supabase
      .from(TABLE)
      .select('*')
      .order('created_at', { ascending: false })
    if (error) throw error
    return data || []
  },

  async insert(payload) {
    const { data, error } = await supabase.from(TABLE).insert(payload).select().single()
    if (error) throw error
    return data
  },

  async update(id, payload) {
    const { data, error } = await supabase
      .from(TABLE)
      .update(payload)
      .eq('id', id)
      .select()
      .single()
    if (error) throw error
    return data
  },

  async remove(id) {
    const { error } = await supabase.from(TABLE).delete().eq('id', id)
    if (error) throw error
    return id
  },
}