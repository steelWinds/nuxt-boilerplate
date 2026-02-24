<script setup lang="ts">
import type * as v from 'valibot';
import { Form } from '~/shared/ui/Form';
import { Input } from '~/shared/ui/Input';
import { initialValues, LoginSchema } from '../lib/schema';

function showFormValues(values: v.InferInput<typeof LoginSchema>) {
  // eslint-disable-next-line no-alert
  alert(JSON.stringify(values));
}
</script>

<template>
  <div class="p-2">
    <Form
      class="flex flex-col space-y-2 items-start"
      :validation-schema="LoginSchema"
      :initial-values
      @submit="showFormValues"
    >
      <Input
        aria-label="email"
        type="email"
        name="email"
        label="Email"
      />

      <Input
        aria-label="password"
        type="password"
        name="password"
        label="Password"
      />

      <button class="p-2 px-6 bg-secondary rounded-md text-primary font-bold" type="submit">
        Submit
      </button>
    </Form>
  </div>
</template>
