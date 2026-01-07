import '@testing-library/jest-dom';
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { EditableContent } from './editable-content';

describe('EditableContent', () => {
    it('renders view content when not editing', () => {
        render(
            <EditableContent
                isEditing={false}
                view={<div data-hook="view">View content</div>}
                edit={<div data-hook="edit">Edit content</div>}
            />
        );

        expect(screen.getByTestId('view')).toBeInTheDocument();
        expect(screen.queryByTestId('edit')).toBeNull();
    });

    it('renders edit content when editing', () => {
        render(
            <EditableContent
                isEditing
                view={<div data-hook="view">View content</div>}
                edit={<div data-hook="edit">Edit content</div>}
            />
        );

        expect(screen.getByTestId('edit')).toBeInTheDocument();
        expect(screen.queryByTestId('view')).toBeNull();
    });
});
