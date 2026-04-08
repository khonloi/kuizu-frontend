import React from 'react';
import ContentListPage from '../shared/ContentListPage';
import { getMyClasses, getPublicClasses, deleteClass } from '@/api/class';
import { useModal } from '@/context/ModalContext';

const ClassesPage = () => {
    const { openClassModal } = useModal();

    return (
        <ContentListPage
            type="classes"
            fetchPublic={getPublicClasses}
            fetchMy={getMyClasses}
            deleteItem={deleteClass}
            openModal={openClassModal}
            title="Classes"
            createLabel="Create Class"
            searchPlaceholder="Search classes..."
            emptyMsg="You haven't joined or created any classes yet."
            itemLabel="members"
            navigatePath="/classes"
        />
    );
};

export default ClassesPage;
