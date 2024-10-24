<template>
  <v-card>
    <v-layout>
      <v-navigation-drawer permanent rail theme="dark">
        <v-list-item nav prepend-avatar="https://randomuser.me/api/portraits/women/75.jpg" />

        <v-divider />

        <v-list density="compact" nav @click.stop="drawer = true">
          <v-list-item prepend-icon="mdi-inbox" @click="selectedItem = 'Inbox'" />
          <v-list-item prepend-icon="mdi-forum" @click="selectedItem = 'Test'" />
        </v-list>
      </v-navigation-drawer>

      <v-navigation-drawer v-model="drawer" temporary width="400">
        <v-container v-if="selectedItem == 'Inbox'">
          <v-row>
            <InboxComp />
          </v-row>
        </v-container>

        <v-container v-if="selectedItem == 'Test'">
          <v-row>
            <h1>test</h1>
          </v-row>
        </v-container>
      </v-navigation-drawer>

      <v-main style="height: 95vh" />
    </v-layout>
  </v-card>
  <!-- <AppFooter /> -->
</template>

<script>
  export default {
    data () {
      return {
        drawer: false,
        group: null,
        selectedItem: null,
      }
    },
    watch: {
      group () {
        this.drawer = false
      },
    },
  }
</script>
