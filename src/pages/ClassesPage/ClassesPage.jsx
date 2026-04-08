import React from 'react';
import ContentListPage from '../shared/ContentListPage';
import { getMyClasses, deleteClass } from '@/api/class';
import { useModal } from '@/context/ModalContext';

const ClassesPage = () => {
    const { openClassModal } = useModal();

    return (
        <ContentListPage
            type="classes"
            fetchMy={getMyClasses}
            deleteItem={deleteClass}
            openModal={openClassModal}
            title="My Classes"
            createLabel="Create Class"
            searchPlaceholder="Search classes..."
            emptyMsg="You haven't joined or created any classes yet."
            itemLabel="members"
            navigatePath="/classes"
        />
    );
};

export default ClassesPage;
