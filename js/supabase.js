const SUPABASE_URL = 'https://dfvkklbeudhuqopdliyj.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRmdmtrbGJldWRodXFvcGRsaXlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODI3MzUwOTUsImV4cCI6MjA5ODMxMTA5NX0.nLtbF1WddqmeIHE38Ow6Np7Lj-4ypoBZsmIMu8tSjfE'

const { createClient } = supabase
const db = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function getHousehold() {
  let { data } = await db.from('household').select('*').limit(1).single()
  if (!data) {
    const { data: created } = await db.from('household').insert({ name: 'Hugo & Audrey' }).select().single()
    data = created
  }
  return data
}

async function getProfiles() {
  const { data } = await db.from('profiles').select('*').order('name')
  return data || []
}

async function createProfile(name) {
  const { data } = await db.from('profiles').insert({ name }).select().single()
  const household = await getHousehold()
  await db.from('profile_household').insert({ profile_id: data.id, household_id: household.id })
  return data
}

async function updateProfileTheme(profileId, theme) {
  await db.from('profiles').update(theme).eq('id', profileId)
}

export { db, getHousehold, getProfiles, createProfile, updateProfileTheme }
