<template>
  <v-toolbar color="transparent" density="compact">

    <v-toolbar-title>Inbox</v-toolbar-title>

    <v-spacer />
    <v-dialog
      v-model="dialog"
      max-width="600"
    >
      <template #activator="{ props: activatorProps }">

        <v-btn v-bind="activatorProps">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>

      <v-card
        prepend-icon="mdi-account"
        title="Capture Item"
      >
        <v-card-text>
          <v-row dense>
            <v-col cols="12" md="12" sm="12">
              <v-text-field label="Title" required />
            </v-col>
            <v-col cols="12" md="12" sm="12">
              <v-text-field
                hint="Add description about the task"
                label="Notes"
              />
            </v-col>

            <v-col
              cols="12"
              sm="12"
            >
              <v-autocomplete
                auto-select-first
                :items="['Skiing', 'Ice hockey', 'Soccer', 'Basketball', 'Hockey', 'Reading', 'Writing', 'Coding', 'Basejump']"
                label="Interests"
                multiple
              />
            </v-col>
            <v-col
              cols="12"
              md="12"
              sm="12"
            >
              <v-text-field
                hint="Add the contexts"
                label="Tags"
                persistent-hint
                required
              />
            </v-col>

            <v-col
              cols="12"
              md="12"
              sm="12"
            >
              <v-date-input
                v-model="model"
                label="Deadline"
              ></v-date-input>

            </v-col>
          </v-row>

          <small class="text-caption text-medium-emphasis">*indicates required field</small>
        </v-card-text>

        <v-divider />

        <v-card-actions>
          <v-spacer />

          <v-btn
            text="Close"
            variant="plain"
            @click="dialog = false"
          />

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="dialog = false"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
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
<script>
export default {
  data: () => ({
    dialog: false,
    model: null
  })
}
</script>
