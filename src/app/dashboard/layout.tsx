"use client";

import { Card, List, ListItem, ListItemPrefix } from "@material-tailwind/react";
import {
  CiPen,
  CiHome,
  CiChat1,
  CiUser,
  CiMenuBurger,
  CiPower,
  CiStar,
  CiMonitor,
  CiMedal,
  CiVoicemail,
} from "react-icons/ci";
import { PiExamThin, PiUsers, PiDatabase } from "react-icons/pi";
import Image from "next/image";
import Link from "next/link";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import officeAssist from "../../assets/officeassist.png";
import { createContext } from "react";
import { useUser } from "@/hooks/useUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Hourglass } from "react-loader-spinner";
import { Button } from "@/components/ui/button";
import { useRouter, usePathname } from "next/navigation";
import { UserContext } from "@/context/UserContext";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));
interface ListItems {
  icon: any;
  text: string;
  link: string;
}

interface Dashboard {
  customer: ListItems[];
  admin: ListItems[];
}

const menuItems: Dashboard = {
  customer: [
    { icon: CiHome, text: "Home", link: "/dashboard" },
    { icon: CiPen, text: "Shop", link: "/dashboard/shop" },
    { icon: CiUser, text: "Profile", link: "/dashboard/profile" },
    { icon: CiVoicemail, text: "About", link: "/dashboard/about" },
  ],
  admin: [
    { icon: CiHome, text: "Home", link: "/dashboard" },
    { icon: CiPen, text: "Add Products", link: "/dashboard/addproducts" },
    {
      icon: CiVoicemail,
      text: "Manage Products",
      link: "/dashboard/manageproducts",
    },
    { icon: PiUsers, text: "Manage Users", link: "/dashboard/manageusers" },
    { icon: CiUser, text: "Profile", link: "/dashboard/profile" },
    {
      icon: PiDatabase,
      text: "Manage Orders",
      link: "/dashboard/manageorders",
    },
  ],
};

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useUser();
  const router = useRouter();
  const activeRoute = usePathname();

  if (loading)
    return (
      <div className="flex h-screen justify-center items-center">
        {" "}
        <Hourglass
          visible={true}
          height="80"
          width="80"
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={["#000000", "#000000"]}
        />
      </div>
    );

  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    router.push("/auth/signin");
  };

  //get active route then check if it a path allowed for the user
  //if not redirect to dashboard
  if (user !== undefined) {
    let allowedRoutes: string[] = [];

    if (user.role === "customer") {
      allowedRoutes = [
        "/dashboard/shop",
        "/dashboard/profile",
        "/dashboard/about",
      ];
    } else if (user.role === "admin") {
      allowedRoutes = [
        "/dashboard/manageusers",
        "/dashboard/manageorders",
        "/dashboard/profile",
        "/dashboard/manageproducts",
        "/dashboard/addproduct",
        "/dashboard/orders",
      ];
    } else {
      allowedRoutes = [
        "/dashboard/shop",
        "/dashboard/profile",
        "/dashboard/about",
        "/dashboard/manageusers",
        "/dashboard/profile",
        "/dashboard/statistics",
        "/dashboard/manageproducts",
        "/dashboard/addproduct",
      ];
    }

    // Add an exact match for /dashboard
    const exactDashboard = "/dashboard";
    const routePattern = new RegExp(`^(${allowedRoutes.join("|")})`);

    if (!routePattern.test(activeRoute) && activeRoute !== exactDashboard) {
      router.push("/dashboard");
    }
  }

  if (user) {
    return (
      <UserContext.Provider value={user}>
        <div className="h-screen  border-0 flex items-center justify-center">
          <div className="w-fit  h-full hidden justify-center items-center sm:flex">
            <Card
              className="h-screen overflow-y-hidden w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5"
              placeholder={undefined}
            >
              <div className="mb-1 p-4 pt-2 flex justify-center items-center">
                <Image src={officeAssist} alt="" width="195" height="95" />
              </div>

              <List placeholder={undefined}>
                <h1 className="font-bold">{user.role.toUpperCase()}</h1>
                {menuItems[user.role].map((item, index) => (
                  <Link key={index} href={item.link}>
                    <ListItem
                      className="hover:bg-gray-100  mb-2 py-1"
                      placeholder={undefined}
                      key={index}
                    >
                      <ListItemPrefix placeholder={undefined}>
                        <item.icon className="h-6 w-6" />
                      </ListItemPrefix>
                      {item.text}
                    </ListItem>
                  </Link>
                ))}
              </List>
              <div className="flex justify-center items-center w-full h-30 bg-mainlighter rounded-lg">
                <Image
                  className="fill-red-50"
                  src={officeAssist}
                  alt="Book Shelf"
                  width="90"
                  height="90"
                />
              </div>
              <div className="h-full  flex p-1">
                <div className="h-fit flex items-center justify-between self-end w-full p-1">
                  <BadgeAvatars />
                  <div>
                    <Button onClick={handleLogOut}>Log Out</Button>
                  </div>
                </div>
              </div>
            </Card>
          </div>
          <div className=" w-full h-screen overflow-scroll bg-[#F7FDFC]">
            <DropDownMenu items={menuItems[user.role]} />
            {children}
          </div>
        </div>
      </UserContext.Provider>
    );
  }
}

function BadgeAvatars() {
  return (
    <Stack direction="row" spacing={2}>
      <StyledBadge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        variant="dot"
      >
        <Avatar alt="Remy Sharp" />
      </StyledBadge>
    </Stack>
  );
}

function DropDownMenu({ items }: { items: any }) {
  const router = useRouter();
  const handleLogOut = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    router.push("/auth/signin");
  };
  return (
    <div className="h-fit w-screen p-4 bg-white z-10 fixed top-0 left-0  sm:hidden">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CiMenuBurger className="font-bold text-3xl" />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            {" "}
            <h1 className="w-screen font-bold text-2xl">Office Assist</h1>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {items.map((item: any, index: number) => (
            <Link key={index} href={item.link}>
              <DropdownMenuItem key={index}>
                <h1 className="w-screen font-bold text-2xl">{item.text}</h1>
              </DropdownMenuItem>
            </Link>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <Button onClick={handleLogOut}>Log Out</Button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
