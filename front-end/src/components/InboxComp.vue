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
              <v-text-field v-model="model.title" label="Title" required />
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
                v-model="model.deadline"
                label="Deadline"
              />

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
            @click="capture"
          />
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-toolbar>

  <v-list lines="two">
    <v-list-item
      v-for="item in inbox"
      :key="item.id"
      subtitle="Lorem ipsum dolor sit amet consectetur adipisicing elit"
      :title="item.title"
    >
      <template #prepend>
        <v-list-item-action start>
          <v-checkbox-btn v-model="item.isDone" />
        </v-list-item-action>
      </template>
    </v-list-item>
  </v-list>

</template>
<script lang="ts">
  export default {
    data: () => ({
      dialog: false,
      inbox: [
        {
          id: 1,
          title: 'test 1',
          isDone: false,
        }, {
          id: 2,
          title: 'test 2',
          isDone: false,
        }, {
          id: 3,
          title: 'test 2',
          isDone: false,
        },
      ],
      model: {
        id: null,
        title: null,
        isDone: false,
        deadline: new Date(),
      },
    }),
    methods: {
      capture: () => {
        // this.model.id = this.inbox.length

        console.log(this.inbox)
      },
    },
  }

</script>
