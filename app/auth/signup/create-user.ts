'use server';

import { POST } from '@/app/common/util/fetch';

export default async function createUser(
  _prevState: { error: string } | { success: boolean },
  formData: FormData,
) {
  const { error } = await POST('users', formData);
  if (error) {
    return { error };
  }

  return { success: true };
}
