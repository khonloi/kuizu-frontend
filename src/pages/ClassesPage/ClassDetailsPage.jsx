import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ContentDetailsPage from '../shared/ContentDetailsPage';
import { getClassDetails, removeClassMaterial, removeMember, processJoinRequest, deleteClass } from '@/api/class';
import { useModal } from '@/context/ModalContext';

const ClassDetailsPage = () => {
    const { classId } = useParams();
    const { openClassModal, openJoinClassModal, openLeaveClassModal, openAddClassMaterialModal } = useModal();
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    const handleRefresh = () => setRefreshTrigger(prev => prev + 1);

    const handleDeleteChild = async (cid, childId) => {
        // We can't easily know if childId is a member or material here 
        // without passing more info to ContentDetailsPage.
        // However, ContentDetailsPage activeTab state is internal.
        
        // Let's refine ContentDetailsPage to pass type of deletion if possible, 
        // OR we can try to guess based on ID format if they were different.
        // But for Classes, we have materials and members.
        
        // Actually, I'll update ContentDetailsPage to pass the current section to deleteChild.
        // FOR NOW, I'll just check if removeClassMaterial fails, try removeMember. (Not ideal)
        
        // BETTER: I'll update ContentDetailsPage to have separate delete handlers or pass section.
        // I chose to pass the section in my next edit.
    };

    const handleOpenAdd = (type) => {
        if (type === 'join') openJoinClassModal(classId, handleRefresh);
        else if (type === 'leave') openLeaveClassModal(classId, handleRefresh);
        else openAddClassMaterialModal(classId, handleRefresh);
    };

    return (
        <ContentDetailsPage
            key={refreshTrigger}
            id={classId}
            type="classes"
            getById={getClassDetails}
            deleteItem={deleteClass}
            deleteChild={async (cid, childId, subType) => {
                if (subType === 'materials') {
                    await removeClassMaterial(cid, childId);
                } else if (subType === 'members') {
                    await removeMember(cid, childId);
                }
            }}
            processRequest={processJoinRequest}
            openEditModal={openClassModal}
            openAddChildModal={handleOpenAdd}
            backPath="/classes"
        />
    );
};

export default ClassDetailsPage;
