// import React from "react";
// import { View, Image } from "react-native";
// import BoldText from "../Texts/BoldText";

// const UserItem = ({ user }) => {
//   return (
//     <View style={{ position: "relative", marginBottom: 48 }}>
//       <Image source={user.imageSource} style={[styles.image, { width: width / 2.209 }]} />
//       <View style={styles.detailsContainer}>
//         <View style={{ gap: 12 }}>
//           <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
//             <BoldText color="#fff" textContent={user.price} />
//           </View>
//           <View style={{ marginTop: 40 }}>
//             <BoldText color="#fff" textContent={user.name} fontSize={13} />
//             <View style={styles.starsContainer}>
//               {[...Array(5)].map((_, starIndex) => (
//                 <Icon
//                   key={starIndex}
//                   name={starIndex < user.rating ? "star-fill" : "star-half-s-line"}
//                   size={14}
//                   color={Colors.primary}
//                 />
//               ))}
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// export default UserItem;
