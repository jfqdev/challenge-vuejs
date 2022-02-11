<template>
    <div class="q-ml-xs">
        <q-card-section>
            <q-toolbar-title>
                Categorias
            </q-toolbar-title>
        </q-card-section>
        <q-list  separator>
            <q-item clickable v-ripple :active="active">
                <q-item-section>Active</q-item-section>
                <q-item-section avatar>
                    <q-icon size="20px" color="primary" name="fas fa-arrow-right" />
                </q-item-section>            
            </q-item>
        </q-list>
    </div>
</template>

<script>
export default {
    name: "categoriesList",
    data(){
        return {
            data: "data"
        }
    }
}
</script>