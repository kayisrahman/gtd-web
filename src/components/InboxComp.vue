<template>
  <v-toolbar color="transparent" density="compact">

    <v-toolbar-title>Inbox</v-toolbar-title>

    <v-spacer />

    <v-btn icon>
      <v-icon>mdi-plus</v-icon>
    </v-btn>

  </v-toolbar>

  <v-expansion-panels>
    <v-expansion-panel
      v-for="i in 3"
      :key="i"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat."
      title="Item"
    />
  </v-expansion-panels>

</template>
