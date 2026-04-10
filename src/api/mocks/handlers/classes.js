import { mockClasses, mockClassMembers, mockClassMaterials } from "../data";

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
    const numericId = parseInt(classId);
    const clazz = mockClasses.find((c) => c.classId === numericId);
    if (!clazz) return null;

    const members = mockClassMembers
      .filter((cm) => cm.classId === clazz.classId)
      .map((cm) => ({
        ...cm.user,
        role: cm.role,
      }));

    const classMaterials = mockClassMaterials.filter((m) => m.classId === numericId);

    return {
      ...clazz,
      members,
      classMaterials,
      ownerId: clazz.owner.userId,
      ownerUserId: clazz.owner.userId,
      ownerUsername: clazz.owner.username,
      joinRequests:
        numericId % 3 === 0 // Give some classes requests
          ? [
              {
                requestId: 500 + numericId,
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
