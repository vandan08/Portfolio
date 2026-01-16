"use client";

import { FaHeart } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/5 py-8">
            <div className="container-custom">
                <div className="text-center">
                    <p className="text-gray-500 text-sm flex items-center justify-center gap-2">
                        Made With <FaHeart className="text-red-500" /> By Vandan.
                    </p>
                    <p className="text-gray-600 text-xs mt-2">
                        © {new Date().getFullYear()} All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}
