
// set up specific updates for items here as functions,
// you're going to end up using `any` here because you're converting data which
// is no longer in sync with the types.

// e.g. (copied from gumshoe)

// export const _setIconForAbilities = (data: any, updateData: any) => {
//   if (isAbility(data.type) && (isNullOrEmptyString(data.img) || data.img === "icons/svg/mystery-man.svg")) {
//     if (!updateData.data) {
//       updateData.data = {};
//     }
//     updateData.img = isGeneralAbility(data.type ?? "") ? generalAbilityIcon : investigativeAbilityIcon;
//   }
//   return updateData;
// };
