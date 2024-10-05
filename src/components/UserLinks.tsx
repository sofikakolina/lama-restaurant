"use client"

import { signOut, useSession } from "next-auth/react"
import Link from "next/link"

const UserLinks = () => {
    const { status } = useSession()
    return (
        <div>
            {status === "authenticated" ? (
                <div className="flex gap-4">
                    <Link href="/orders">Orders</Link>
                    <button onClick={() => signOut()}>Logout</button>
                </div>
            ) : (
                <Link href="/login">Login</Link>
            )}
        </div>
    )
}

export default UserLinks