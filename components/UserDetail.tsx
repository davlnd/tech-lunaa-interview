import { User } from "@/types/user";

interface UserDetailProps {
    user: User;
}

export default function UserDetail({ user }: UserDetailProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <div className="border-b border-gray-200 bg-gray-50 px-6 py-4">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-100 text-lg font-semibold text-blue-700">
            {user.name.charAt(0)}
          </div>
          <div>
            <h1 className="text-xl font-semibold text-gray-900">{user.name}</h1>
            <p className="text-sm text-gray-500">@{user.username}</p>
          </div>
        </div>
      </div>

      <div className="grid gap-6 p-6 sm:grid-cols-2">
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
            Contacto
          </h2>
          <dl className="space-y-2">
            <div>
              <dt className="text-xs text-gray-500">Email</dt>
              <dd className="text-sm font-medium text-gray-900">
                {user.email}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Teléfono</dt>
              <dd className="text-sm font-medium text-gray-900">
                {user.phone}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Sitio web</dt>
              <a href={`https://${user.website}`} target="_blank" rel="nofollow" className="text-sm font-medium text-blue-600">
                {user.website}
              </a>
            </div>
          </dl>
        </section>

        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
            Empresa
          </h2>
          <dl className="space-y-2">
            <div>
              <dt className="text-xs text-gray-500">Nombre</dt>
              <dd className="text-sm font-medium text-gray-900">
                {user.company.name}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">Eslogan</dt>
              <dd className="text-sm text-gray-700">
                {user.company.catchPhrase}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-gray-500">BS</dt>
              <dd className="text-sm text-gray-700">{user.company.bs}</dd>
            </div>
          </dl>
        </section>

        <section className="sm:col-span-2">
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-400">
            Dirección
          </h2>
          <p className="text-sm text-gray-700">
            {user.address.suite}, {user.address.street}
          </p>
          <p className="text-sm text-gray-700">
            {user.address.city}, {user.address.zipcode}
          </p>
        </section>
      </div>
    </div>
  );
}
