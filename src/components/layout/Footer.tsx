import React from 'react'
import { Facebook, Github, Instagram, Linkedin, Twitter } from 'lucide-react'

const footerData = [
  { id: 1, value: 'Terms and conditions' },
  { id: 2, value: 'Privacy Policy' },
  { id: 3, value: 'Licensing' },
  { id: 4, value: 'Cookie Policy' },
  { id: 5, value: 'Contact' },
]

const footerDataImg = [
  { id: 1, Img: Github },
  { id: 2, Img: Twitter },
  { id: 3, Img: Linkedin },
  { id: 4, Img: Facebook },
  { id: 5, Img: Instagram },
]

function Footer() {
  return (
    <div className="w-full flex justify-between items-center bg-componentBg border border-borderColor rounded-lg p-8 dark:bg-white dark:border-gray-200">
      <div className="flex items-center flex-wrap gap-6 md:gap-4">
        {footerData.map(item => (
          <div key={item.id} className="text-sm font-light text-gray-400 hover:cursor-pointer dark:text-gray-600">
            {item.value}
          </div>
        ))}
      </div>
      <div className="flex gap-6 md:gap-4">
        {footerDataImg.map(item => (
          <div key={item.id}>
            <item.Img className="w-5 h-5 text-gray-400 hover:cursor-pointer dark:text-gray-500" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default Footer
