// Script para crear perfiles faltantes en Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xymkqhnspyrkntpxgtkx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5bWtxaG5zcHlya250cHhndGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyMTQ1OTAsImV4cCI6MjA4NDc5MDU5MH0.nMszz5SXiijydnzBSu_hQhC8svtkyWAsbEmdPg2zhes';

const supabase = createClient(supabaseUrl, supabaseKey);

async function fixProfiles() {
  console.log('🔍 Verificando perfiles...\n');
  
  try {
    // Obtener todos los usuarios de auth
    const { data: { users }, error: authError } = await supabase.auth.admin.listUsers();
    
    if (authError) {
      console.error('❌ Error obteniendo usuarios:', authError.message);
      console.log('\n⚠️  Nota: Este script necesita la clave service_role para listar usuarios.');
      console.log('   Por ahora, los perfiles se crearán automáticamente al registrarse.');
      return;
    }

    console.log(`✓ Encontrados ${users.length} usuarios en auth.users`);

    // Obtener todos los perfiles
    const { data: profiles, error: profilesError } = await supabase
      .from('profiles')
      .select('id');

    if (profilesError) {
      console.error('❌ Error obteniendo perfiles:', profilesError.message);
      return;
    }

    console.log(`✓ Encontrados ${profiles.length} perfiles en profiles\n`);

    const profileIds = new Set(profiles.map(p => p.id));
    const missingProfiles = users.filter(u => !profileIds.has(u.id));

    if (missingProfiles.length === 0) {
      console.log('✅ Todos los usuarios tienen perfil!');
      return;
    }

    console.log(`⚠️  Faltan ${missingProfiles.length} perfiles\n`);

    // Crear perfiles faltantes
    for (const user of missingProfiles) {
      console.log(`Creando perfil para: ${user.email}`);
      
      const { error } = await supabase.from('profiles').insert({
        id: user.id,
        email: user.email,
        full_name: user.user_metadata?.full_name || ''
      });

      if (error) {
        console.log(`  ❌ Error: ${error.message}`);
      } else {
        console.log(`  ✓ Perfil creado`);
      }
    }

    console.log('\n✅ Proceso completado!');

  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

fixProfiles();
