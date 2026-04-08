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
