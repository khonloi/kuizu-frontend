import React, { createContext, useContext, useState } from 'react';
import FlashcardSetModal from '@/components/Flashcard/FlashcardSetModal';
import FlashcardModal from '@/components/Flashcard/FlashcardModal';
import FolderModal from '@/components/Folder/FolderModal';
import CreateClassModal from '@/components/Class/CreateClassModal';
import EditClassModal from '@/components/Class/EditClassModal';
import JoinClassModal from '@/components/Class/JoinClassModal';
import LeaveClassModal from '@/components/Class/LeaveClassModal';
import AddClassMaterialModal from '@/components/Class/AddClassMaterialModal';

const ModalContext = createContext();

export const ModalProvider = ({ children }) => {
    const [setModal, setSetModal] = useState({ isOpen: false, setId: null, callback: null });
    const [cardModal, setCardModal] = useState({ isOpen: false, setId: null, cardId: null, callback: null });
    const [folderModal, setFolderModal] = useState({ isOpen: false, folderId: null, callback: null });
    const [classModal, setClassModal] = useState({ isOpen: false, mode: 'create', classData: null, callback: null });
    const [joinClassModal, setJoinClassModal] = useState({ isOpen: false, classId: null, callback: null });
    const [leaveClassModal, setLeaveClassModal] = useState({ isOpen: false, classId: null, callback: null });
    const [materialModal, setMaterialModal] = useState({ isOpen: false, classId: null, callback: null });

    const openSetModal = (setId = null, callback = null) => setSetModal({ isOpen: true, setId, callback });
    const closeSetModal = () => setSetModal({ isOpen: false, setId: null, callback: null });

    const openCardModal = (setId = null, cardId = null, callback = null) => setCardModal({ isOpen: true, setId, cardId, callback });
    const closeCardModal = () => setCardModal({ isOpen: false, setId: null, cardId: null, callback: null });

    const openFolderModal = (folderId = null, callback = null) => setFolderModal({ isOpen: true, folderId, callback });
    const closeFolderModal = () => setFolderModal({ isOpen: false, folderId: null, callback: null });

    const openClassModal = (classData = null, callback = null) => {
        setClassModal({ isOpen: true, mode: classData ? 'edit' : 'create', classData, callback });
    };
    const closeClassModal = () => setClassModal({ isOpen: false, mode: 'create', classData: null, callback: null });

    const openJoinClassModal = (classId = null, callback = null) => setJoinClassModal({ isOpen: true, classId, callback });
    const closeJoinClassModal = () => setJoinClassModal({ isOpen: false, classId: null, callback: null });

    const openLeaveClassModal = (classId = null, callback = null) => setLeaveClassModal({ isOpen: true, classId, callback });
    const closeLeaveClassModal = () => setLeaveClassModal({ isOpen: false, classId: null, callback: null });

    const openAddClassMaterialModal = (classId = null, callback = null) => setMaterialModal({ isOpen: true, classId, callback });
    const closeAddClassMaterialModal = () => setMaterialModal({ isOpen: false, classId: null, callback: null });

    return (
        <ModalContext.Provider value={{ 
            openSetModal, openCardModal, openFolderModal, 
            openClassModal, openJoinClassModal, openLeaveClassModal, openAddClassMaterialModal 
        }}>
            {children}
            <FlashcardSetModal isOpen={setModal.isOpen} onClose={closeSetModal} setId={setModal.setId} onSuccess={setModal.callback} />
            <FlashcardModal isOpen={cardModal.isOpen} onClose={closeCardModal} setId={cardModal.setId} cardId={cardModal.cardId} onSuccess={cardModal.callback} />
            <FolderModal isOpen={folderModal.isOpen} onClose={closeFolderModal} folderId={folderModal.folderId} onSuccess={folderModal.callback} />
            
            {classModal.mode === 'create' ? (
                <CreateClassModal isOpen={classModal.isOpen} onClose={closeClassModal} onClassCreated={classModal.callback} />
            ) : (
                <EditClassModal isOpen={classModal.isOpen} onClose={closeClassModal} classData={classModal.classData} onUpdateSuccess={classModal.callback} />
            )}

            <JoinClassModal isOpen={joinClassModal.isOpen} onClose={closeJoinClassModal} classId={joinClassModal.classId} onJoinSuccess={joinClassModal.callback} />
            <LeaveClassModal isOpen={leaveClassModal.isOpen} onClose={closeLeaveClassModal} classId={leaveClassModal.classId} onConfirm={leaveClassModal.callback} />
            <AddClassMaterialModal isOpen={materialModal.isOpen} onClose={closeAddClassMaterialModal} classId={materialModal.classId} onMaterialAdded={materialModal.callback} />
        </ModalContext.Provider>
    );
};

export const useModal = () => {
    const context = useContext(ModalContext);
    if (!context) throw new Error('useModal must be used within a ModalProvider');
    return context;
};
