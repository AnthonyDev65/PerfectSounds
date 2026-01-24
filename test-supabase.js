// Script para probar la conexión con Supabase
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://xymkqhnspyrkntpxgtkx.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh5bWtxaG5zcHlya250cHhndGt4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjkyMTQ1OTAsImV4cCI6MjA4NDc5MDU5MH0.nMszz5SXiijydnzBSu_hQhC8svtkyWAsbEmdPg2zhes';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testConnection() {
  console.log('🔍 Probando conexión con Supabase...\n');
  
  try {
    // Test 1: Verificar conexión básica
    console.log('✓ Cliente de Supabase creado');
    console.log(`  URL: ${supabaseUrl}`);
    
    // Test 2: Verificar tablas
    console.log('\n📊 Verificando tablas...');
    
    const tables = ['profiles', 'songs', 'advanced_songs', 'favorites'];
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`  ❌ ${table}: ${error.message}`);
        } else {
          console.log(`  ✓ ${table}: OK`);
        }
      } catch (err) {
        console.log(`  ❌ ${table}: ${err.message}`);
      }
    }
    
    console.log('\n✅ Prueba completada!');
    console.log('\n📝 Próximos pasos:');
    console.log('1. Si ves errores, ejecuta el schema SQL en Supabase');
    console.log('2. Ve a Supabase Dashboard > SQL Editor');
    console.log('3. Copia y pega el contenido de supabase-schema.sql');
    console.log('4. Ejecuta el script');
    console.log('5. Vuelve a ejecutar este test');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

testConnection();
