import { FaTwitter, FaTelegram, FaGithub, FaLinkedin } from 'react-icons/fa'
import Link from 'next/link'
import NewsletterForm from '@/components/newsletter/NewsletterForm'

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          <NewsletterForm />
          <div className="flex space-x-6 mb-6 mt-8">
            <Link href="https://x.com/_TheCaptain___" target="_blank" className="hover:text-blue-400 transition-colors">
              <FaTwitter size={24} />
            </Link>
            <Link href="https://t.me/ZenithCore_Haber_Bulteni" target="_blank" className="hover:text-blue-400 transition-colors">
              <FaTelegram size={24} />
            </Link>
            <Link href="https://github.com/click000" target="_blank" className="hover:text-gray-400 transition-colors">
              <FaGithub size={24} />
            </Link>
            <Link href="https://www.linkedin.com/in/engin-yazar-016542262/" target="_blank" className="hover:text-blue-400 transition-colors">
              <FaLinkedin size={24} />
            </Link>
          </div>
          <p className="text-gray-400">© 2024 EnginyazarNews. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  )
}
