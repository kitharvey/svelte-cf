// src/lib/types.ts
export interface Post {
	id: number;
	content: string;
	created_at: number;
	updated_at: number;
}

export type FormState = {
	createError?: string;
	updateError?: string;
	deleteError?: string;
};
