import { mockClasses, mockClassMembers } from "../data";

export const classHandlers = {
  getMyClasses: async (userId = "u1-uuid-1234-5678") => {
    const owned = mockClasses.filter((c) => c.owner.userId === userId);
    const memberOfIds = mockClassMembers
      .filter((cm) => cm.user.userId === userId)
      .map((cm) => cm.classId);
    const memberOf = mockClasses.filter((c) => memberOfIds.includes(c.classId));
    return [...new Set([...owned, ...memberOf])].map((c) => ({
      ...c,
      title: c.className,
    }));
  },
  getPublicClasses: async () => {
    return mockClasses
      .filter((c) => c.visibility === "PUBLIC")
      .map((c) => ({ ...c, title: c.className }));
  },
  getClassDetails: async (classId) => {
    const clazz = mockClasses.find((c) => c.classId === parseInt(classId));
    if (!clazz) return null;
    const members = mockClassMembers
      .filter((cm) => cm.classId === clazz.classId)
      .map((cm) => ({
        ...cm.user,
        role: cm.role,
      }));

    const classMaterials =
      clazz.classId === 1
        ? [
            {
              materialId: 1001,
              materialType: "SET",
              materialRefId: 1,
              materialName: "Basic Biology",
            },
            {
              materialId: 1002,
              materialType: "FOLDER",
              materialRefId: 4,
              materialName: "General Science",
            },
          ]
        : [];

    return {
      ...clazz,
      members,
      classMaterials,
      ownerId: clazz.owner.userId,
      ownerUserId: clazz.owner.userId,
      ownerUsername: clazz.owner.username,
      joinRequests:
        clazz.classId === 1
          ? [
              {
                requestId: 501,
                userId: "u4-uuid",
                displayName: "Bob Wilson",
                message: "Please let me in!",
              },
            ]
          : [],
    };
  },
  joinClass: async (classId, { joinCode }) => {
    const clazz = mockClasses.find((c) => c.classId === parseInt(classId));
    if (clazz && clazz.joinCode === joinCode)
      return { message: "Joined successfully" };
    throw { response: { status: 400, data: { message: "Invalid join code" } } };
  },
};
