"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function fetchUser() {
      const res = await fetch("/api/user");
      if (res.ok) {
        const data = await res.json();
        setUser(data);
      } else {
        router.push("/login");
      }
    }
    fetchUser();
  }, [router]);

  const handleLogout = async () => {
    await fetch("/api/logout");
    router.push("/");
  };

  if (!user) return <p>Loading...</p>;

  return (
    <div className="card p-4">
      <h2>Dashboard</h2>
      <p>
        <strong>ID:</strong> {user.id}
      </p>
      <p>
        <strong>Name:</strong> {user.name}
      </p>
      <button className="btn btn-danger" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}
