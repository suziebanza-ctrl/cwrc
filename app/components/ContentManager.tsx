"use client";

import {
  FormEvent,
  useEffect,
  useState,
} from "react";

type PublicationStatus =
  | "draft"
  | "published"
  | "archived";

type ContentType =
  | "story"
  | "article"
  | "photo"
  | "ai_map"
  | "announcement";

type ContentItem = {
  id: string;
  room_key: string;
  object_key: string;
  content_type: ContentType;
  title_fr: string;
  title_en: string | null;
  title_es: string | null;
  body_fr: string;
  body_en: string | null;
  body_es: string | null;
  image_path: string | null;
  image_alt_fr: string | null;
  image_alt_en: string | null;
  image_alt_es: string | null;
  status: PublicationStatus;
  publish_at: string | null;
  unpublish_at: string | null;
  created_at: string;
  updated_at: string;
};

type DailyMessage = {
  id: string;
  message: string;
  author_name: string;
  active: boolean;
  created_at: string;
};

type ContentForm = {
  room_key: string;
  object_key: string;
  content_type: ContentType;
  title_fr: string;
  title_en: string;
  title_es: string;
  body_fr: string;
  body_en: string;
  body_es: string;
  image_alt_fr: string;
  image_alt_en: string;
  image_alt_es: string;
  status: PublicationStatus;
};

const rooms = {
    home: {
    label: "✨ Accueil — Quoi de neuf?",
    objects: [
      ["whats-new", "Dernière nouveauté du CWRC"],
    ],
  },
  kitchen: {
    label: "🍲 Cuisine",
    objects: [
      ["recipes", "Livre de recettes"],
      ["dailyPlan", "Tableau du jour"],
      ["coffee", "Station de café"],
      ["annie", "Histoires d’Annie"],
      ["library", "Bibliothèque nutrition"],
      ["pantry", "Garde-manger"],
      ["table", "Table de la bonne compagnie"],
      ["window", "Fenêtre des saisons"],
    ],
  },

  library: {
    label: "📚 Grande Bibliothèque",
    objects: [
      ["jokeBook", "Livre des 100 blagues"],
      ["confirmedHall", "Hall des vérités"],
      ["animalTeam", "Équipe animale"],
      ["jenny", "Section de Jenny"],
      ["capone", "Capone"],
      ["lilo", "Coin de Lilo"],
      ["globe", "Globe des histoires"],
      ["staffDoor", "Passage réservé aux pattes"],
      ["secretShelf", "Étagère secrète"],
      ["cathySign", "Tableau de Cathy"],
    ],
  },

  "office-suzie": {
    label: "👩‍🔬 Bureau de Suzie",
    objects: [
      ["suzie", "Suzie et sa planchette"],
      ["diplomas", "Mur des diplômes"],
      ["gaspesie", "Souvenirs de la Gaspésie"],
      ["lilo", "Lilo"],
      ["quality", "Qualité"],
      ["books", "Dossiers"],
      ["cwrc", "Affiche du CWRC"],
      ["smallGlobe", "Voyage par continent"],
      ["largeGlobe", "Grand défi mondial"],
    ],
  },

  "administrative-office": {
    label: "🦉 Bureau d’Amateur",
    objects: [
      ["amateur", "Amateur"],
      ["chocolate", "Tiroir à chocolat"],
      ["tea", "Thé de quatre heures"],
      ["map", "Carte mondiale"],
      ["ranger", "Empreinte de Ranger"],
    ],
  },

  "grand-salon": {
    label: "🛋️ Grand Salon de détente",
    objects: [
      ["hourglass", "Sablier du CWRC"],
      ["mask", "Masque mexicain"],
      ["wall", "Tableau de la Grande Muraille"],
      ["statues", "Statuettes africaines"],
      ["perch", "Perchoir d’Amateur"],
      ["window", "Fenêtre ouverte"],
      ["apples", "Panier de pommes"],
      ["cookies", "Jarre à biscuits"],
      ["candy", "Pots de bonbons"],
      ["capone", "Capone"],
      ["niko", "Niko"],
      ["amateur", "Amateur"],
    ],
  },

  laboratory: {
    label: "🔬 Laboratoire",
    objects: [
      ["main", "Espace principal"],
      ["experiment", "Expérience"],
      ["equipment", "Équipement"],
      ["notice", "Tableau d’information"],
    ],
  },

  greenhouse: {
    label: "🌿 Serre",
    objects: [
      ["main", "Espace principal"],
      ["plants", "Plantes"],
      ["window", "Fenêtre"],
      ["table", "Table de travail"],
    ],
  },
} as const;

type RoomKey = keyof typeof rooms;

const emptyForm: ContentForm = {
  room_key: "kitchen",
  object_key: "dailyPlan",
  content_type: "story",
  title_fr: "",
  title_en: "",
  title_es: "",
  body_fr: "",
  body_en: "",
  body_es: "",
  image_alt_fr: "",
  image_alt_en: "",
  image_alt_es: "",
  status: "draft",
};

export default function ContentManager() {
  const [token, setToken] =
    useState("");

  const [contents, setContents] =
    useState<ContentItem[]>([]);

  const [dailyMessage, setDailyMessage] =
    useState<DailyMessage | null>(null);

  const [messageText, setMessageText] =
    useState("");

  const [form, setForm] =
    useState<ContentForm>(emptyForm);

  const [imageFile, setImageFile] =
    useState<File | null>(null);

  const [existingImagePath, setExistingImagePath] =
    useState<string | null>(null);

  const [editingId, setEditingId] =
    useState<string | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [saving, setSaving] =
    useState(false);

  const [notice, setNotice] =
    useState("");

  const [hasError, setHasError] =
    useState(false);

  const url =
    process.env.NEXT_PUBLIC_SUPABASE_URL;

  const key =
    process.env
      .NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

  const roomKey =
    form.room_key as RoomKey;

  const availableObjects =
    rooms[roomKey]?.objects ??
    rooms.kitchen.objects;

  useEffect(() => {
    function readToken() {
      const savedToken =
        sessionStorage.getItem(
          "cwrc_admin_token",
        );

      setToken((current) =>
        current === (savedToken ?? "")
          ? current
          : savedToken ?? "",
      );
    }

    readToken();

    const interval =
      window.setInterval(
        readToken,
        1000,
      );

    return () =>
      window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!token || !url || !key) {
      setContents([]);
      setDailyMessage(null);
      return;
    }

    void loadAdministrativeContent(
      token,
    );
  }, [token, url, key]);

  async function loadAdministrativeContent(
    accessToken: string,
  ) {
    setLoading(true);
    setNotice("");
    setHasError(false);

    try {
      const headers = {
        apikey: key!,
        Authorization:
          `Bearer ${accessToken}`,
      };

      const [
        contentResponse,
        messageResponse,
      ] = await Promise.all([
        fetch(
          `${url}/rest/v1/cwrc_content?select=*&order=updated_at.desc`,
          { headers },
        ),
        fetch(
          `${url}/rest/v1/cwrc_daily_messages?select=*&active=eq.true&order=created_at.desc&limit=1`,
          { headers },
        ),
      ]);

      if (
        !contentResponse.ok ||
        !messageResponse.ok
      ) {
        throw new Error(
          "Accès administratif refusé.",
        );
      }

      const contentData =
        await contentResponse.json();

      const messageData =
        await messageResponse.json();

      setContents(contentData);

      setDailyMessage(
        messageData[0] ?? null,
      );

      setMessageText(
        messageData[0]?.message ?? "",
      );
    } catch (error) {
      setHasError(true);
      setNotice(
        error instanceof Error
          ? error.message
          : "Impossible de charger le contenu.",
      );
    } finally {
      setLoading(false);
    }
  }

  function updateForm<
    K extends keyof ContentForm,
  >(
    field: K,
    value: ContentForm[K],
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));

    setNotice("");
    setHasError(false);
  }

  function changeRoom(
    newRoom: string,
  ) {
    const validRoom =
      newRoom as RoomKey;

    const firstObject =
      rooms[validRoom].objects[0][0];

    setForm((current) => ({
      ...current,
      room_key: validRoom,
      object_key: firstObject,
    }));
  }

  async function saveDailyMessage() {
    if (!token || !url || !key) {
      setHasError(true);
      setNotice(
        "Connectez-vous d’abord au portail.",
      );
      return;
    }

    if (!messageText.trim()) {
      setHasError(true);
      setNotice(
        "Écrivez d’abord le message du jour.",
      );
      return;
    }

    setSaving(true);
    setHasError(false);
    setNotice("");

    const identity =
      getIdentity(token);

    try {
      const headers = {
        apikey: key,
        Authorization:
          `Bearer ${token}`,
        "Content-Type":
          "application/json",
      };

      const deactivateResponse =
        await fetch(
          `${url}/rest/v1/cwrc_daily_messages?active=eq.true`,
          {
            method: "PATCH",
            headers,
            body: JSON.stringify({
              active: false,
            }),
          },
        );

      if (!deactivateResponse.ok) {
        throw new Error(
          await deactivateResponse.text(),
        );
      }

      const createResponse =
        await fetch(
          `${url}/rest/v1/cwrc_daily_messages`,
          {
            method: "POST",
            headers: {
              ...headers,
              Prefer:
                "return=representation",
            },
            body: JSON.stringify({
              message:
                messageText.trim(),
              author_id:
                identity.userId,
              author_name:
                identity.name,
              active: true,
            }),
          },
        );

      if (!createResponse.ok) {
        throw new Error(
          await createResponse.text(),
        );
      }

      const created =
        await createResponse.json();

      setDailyMessage(
        created[0] ?? null,
      );

      setNotice(
        "Le message privé du jour est enregistré.",
      );
    } catch (error) {
      setHasError(true);
      setNotice(
        error instanceof Error
          ? error.message
          : "Le message n’a pas pu être enregistré.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function saveContent(
    event: FormEvent<HTMLFormElement>,
  ) {
    event.preventDefault();

    if (!token || !url || !key) {
      setHasError(true);
      setNotice(
        "Connectez-vous d’abord au portail.",
      );
      return;
    }

    if (
      !form.title_fr.trim() ||
      !form.body_fr.trim()
    ) {
      setHasError(true);
      setNotice(
        "Le titre et le texte français sont obligatoires.",
      );
      return;
    }

    if (
      imageFile &&
      ![
        "image/jpeg",
        "image/png",
        "image/webp",
        "image/gif",
      ].includes(imageFile.type)
    ) {
      setHasError(true);
      setNotice(
        "Format refusé. Utilisez JPG, PNG, WEBP ou GIF.",
      );
      return;
    }

    if (
      imageFile &&
      imageFile.size >
        10 * 1024 * 1024
    ) {
      setHasError(true);
      setNotice(
        "L’image dépasse la limite de 10 Mo.",
      );
      return;
    }

    setSaving(true);
    setNotice("");
    setHasError(false);

    const identity =
      getIdentity(token);

    try {
      let imagePath =
        existingImagePath;

      if (imageFile) {
        imagePath = await uploadImage(
          imageFile,
          identity.userId,
        );
      }

      const payload = {
        room_key: form.room_key,
        object_key: form.object_key,
        content_type:
          form.content_type,

        title_fr:
          form.title_fr.trim(),
        title_en:
          form.title_en.trim() ||
          null,
        title_es:
          form.title_es.trim() ||
          null,

        body_fr:
          form.body_fr.trim(),
        body_en:
          form.body_en.trim() ||
          null,
        body_es:
          form.body_es.trim() ||
          null,

        image_path: imagePath,

        image_alt_fr:
          form.image_alt_fr.trim() ||
          null,
        image_alt_en:
          form.image_alt_en.trim() ||
          null,
        image_alt_es:
          form.image_alt_es.trim() ||
          null,

        status: form.status,

        publish_at:
          form.status === "published"
            ? new Date().toISOString()
            : null,

        created_by:
          identity.userId,

        updated_by:
          identity.userId,
      };

      const response =
        await fetch(
          editingId
            ? `${url}/rest/v1/cwrc_content?id=eq.${encodeURIComponent(
                editingId,
              )}`
            : `${url}/rest/v1/cwrc_content`,
          {
            method: editingId
              ? "PATCH"
              : "POST",
            headers: {
              apikey: key,
              Authorization:
                `Bearer ${token}`,
              "Content-Type":
                "application/json",
              Prefer:
                "return=representation",
            },
            body: JSON.stringify(
              payload,
            ),
          },
        );

      if (!response.ok) {
        throw new Error(
          await response.text(),
        );
      }

      resetForm();

      setNotice(
        editingId
          ? "Le contenu a été modifié."
          : form.status ===
              "published"
            ? "Le contenu est maintenant publié."
            : "Le brouillon est enregistré.",
      );

      await loadAdministrativeContent(
        token,
      );
    } catch (error) {
      setHasError(true);
      setNotice(
        error instanceof Error
          ? error.message
          : "Le contenu n’a pas pu être enregistré.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function uploadImage(
    file: File,
    userId: string,
  ) {
    const safeName = file.name
      .normalize("NFD")
      .replace(
        /[\u0300-\u036f]/g,
        "",
      )
      .replace(
        /[^a-zA-Z0-9._-]/g,
        "-",
      )
      .toLowerCase();

    const path =
      `${userId}/${Date.now()}-${safeName}`;

    const response = await fetch(
      `${url}/storage/v1/object/cwrc-public-content/${path}`,
      {
        method: "POST",
        headers: {
          apikey: key!,
          Authorization:
            `Bearer ${token}`,
          "Content-Type": file.type,
          "x-upsert": "false",
        },
        body: file,
      },
    );

    if (!response.ok) {
      throw new Error(
        `Téléversement refusé : ${await response.text()}`,
      );
    }

    return path;
  }

  function editContent(
    content: ContentItem,
  ) {
    setEditingId(content.id);
    setExistingImagePath(
      content.image_path,
    );
    setImageFile(null);

    setForm({
      room_key: content.room_key,
      object_key:
        content.object_key,
      content_type:
        content.content_type,
      title_fr: content.title_fr,
      title_en:
        content.title_en ?? "",
      title_es:
        content.title_es ?? "",
      body_fr: content.body_fr,
      body_en:
        content.body_en ?? "",
      body_es:
        content.body_es ?? "",
      image_alt_fr:
        content.image_alt_fr ?? "",
      image_alt_en:
        content.image_alt_en ?? "",
      image_alt_es:
        content.image_alt_es ?? "",
      status: content.status,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  async function changeStatus(
    content: ContentItem,
    status: PublicationStatus,
  ) {
    if (!token || !url || !key) {
      return;
    }

    setSaving(true);
    setNotice("");
    setHasError(false);

    const identity =
      getIdentity(token);

    try {
      const response = await fetch(
        `${url}/rest/v1/cwrc_content?id=eq.${encodeURIComponent(
          content.id,
        )}`,
        {
          method: "PATCH",
          headers: {
            apikey: key,
            Authorization:
              `Bearer ${token}`,
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            status,
            publish_at:
              status === "published"
                ? new Date().toISOString()
                : content.publish_at,
            updated_by:
              identity.userId,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(
          await response.text(),
        );
      }

      setNotice(
        status === "published"
          ? "Le contenu est publié."
          : status === "archived"
            ? "Le contenu est archivé."
            : "Le contenu est redevenu un brouillon.",
      );

      await loadAdministrativeContent(
        token,
      );
    } catch (error) {
      setHasError(true);
      setNotice(
        error instanceof Error
          ? error.message
          : "Le statut n’a pas pu être modifié.",
      );
    } finally {
      setSaving(false);
    }
  }

  async function deleteContent(
    content: ContentItem,
  ) {
    if (!token || !url || !key) {
      return;
    }

    const confirmed =
      window.confirm(
        `Supprimer définitivement « ${content.title_fr} »?`,
      );

    if (!confirmed) {
      return;
    }

    setSaving(true);

    try {
      const response = await fetch(
        `${url}/rest/v1/cwrc_content?id=eq.${encodeURIComponent(
          content.id,
        )}`,
        {
          method: "DELETE",
          headers: {
            apikey: key,
            Authorization:
              `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        throw new Error(
          await response.text(),
        );
      }

      if (
        editingId === content.id
      ) {
        resetForm();
      }

      setNotice(
        "Le contenu a été supprimé.",
      );

      await loadAdministrativeContent(
        token,
      );
    } catch (error) {
      setHasError(true);
      setNotice(
        error instanceof Error
          ? error.message
          : "La suppression a échoué.",
      );
    } finally {
      setSaving(false);
    }
  }

  function resetForm() {
    setForm(emptyForm);
    setImageFile(null);
    setExistingImagePath(null);
    setEditingId(null);
  }

  if (!token) {
    return (
      <section style={lockedStyle}>
        <span style={largeIconStyle}>
          🔐
        </span>

        <h2>
          Publication et messages
        </h2>

        <p>
          Connectez-vous dans le
          courrier arrivé pour ouvrir
          cet espace.
        </p>
      </section>
    );
  }

  return (
    <section style={managerStyle}>
      <header style={managerHeaderStyle}>
        <span style={largeIconStyle}>
          📝
        </span>

        <div>
          <p style={eyebrowStyle}>
            Cathy et Suzie seulement
          </p>

          <h2 style={managerTitleStyle}>
            Publication sans code
          </h2>

          <p style={managerIntroStyle}>
            Écrivez, ajoutez une image,
            choisissez un objet et
            publiez.
          </p>
        </div>
      </header>

      {notice && (
        <p
          style={
            hasError
              ? errorStyle
              : successStyle
          }
        >
          {notice}
        </p>
      )}

      {loading && (
        <p style={loadingStyle}>
          Ouverture de l’espace de
          publication…
        </p>
      )}

      <section style={messageCardStyle}>
        <div>
          <p style={eyebrowStyle}>
            Message privé
          </p>

          <h3 style={sectionTitleStyle}>
            Message du jour pour Cathy
            et Suzie
          </h3>
        </div>

        {dailyMessage && (
          <blockquote
            style={currentMessageStyle}
          >
            <p>
              « {dailyMessage.message} »
            </p>

            <footer>
              —{" "}
              {dailyMessage.author_name}
            </footer>
          </blockquote>
        )}

        <label style={fieldStyle}>
          <span>Nouveau message</span>

          <textarea
            value={messageText}
            onChange={(event) =>
              setMessageText(
                event.target.value,
              )
            }
            maxLength={2000}
            rows={4}
            placeholder="Écrivez ici un mot pour Cathy ou Suzie…"
            style={textareaStyle}
          />
        </label>

        <button
          type="button"
          disabled={saving}
          onClick={() =>
            void saveDailyMessage()
          }
          style={goldButtonStyle}
        >
          {saving
            ? "Enregistrement…"
            : "Enregistrer le message privé"}
        </button>
      </section>

      <form
        onSubmit={saveContent}
        style={publisherCardStyle}
      >
        <div style={sectionHeaderStyle}>
          <div>
            <p style={eyebrowStyle}>
              Contenu du site
            </p>

            <h3
              style={sectionTitleStyle}
            >
              {editingId
                ? "Modifier le contenu"
                : "Nouvelle publication"}
            </h3>
          </div>

          {editingId && (
            <button
              type="button"
              onClick={resetForm}
              style={secondaryButtonStyle}
            >
              Annuler la modification
            </button>
          )}
        </div>

        <div style={selectionGridStyle}>
          <label style={fieldStyle}>
            <span>Pièce</span>

            <select
              value={form.room_key}
              onChange={(event) =>
                changeRoom(
                  event.target.value,
                )
              }
              style={inputStyle}
            >
              {Object.entries(
                rooms,
              ).map(
                ([value, room]) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {room.label}
                  </option>
                ),
              )}
            </select>
          </label>

          <label style={fieldStyle}>
            <span>
              Objet ou emplacement
            </span>

            <select
              value={
                form.object_key
              }
              onChange={(event) =>
                updateForm(
                  "object_key",
                  event.target.value,
                )
              }
              style={inputStyle}
            >
              {availableObjects.map(
                ([value, label]) => (
                  <option
                    key={value}
                    value={value}
                  >
                    {label}
                  </option>
                ),
              )}
            </select>
          </label>

          <label style={fieldStyle}>
            <span>
              Type de contenu
            </span>

            <select
              value={
                form.content_type
              }
              onChange={(event) =>
                updateForm(
                  "content_type",
                  event.target
                    .value as ContentType,
                )
              }
              style={inputStyle}
            >
              <option value="story">
                Histoire
              </option>

              <option value="article">
                Article
              </option>

              <option value="photo">
                Photo réelle
              </option>

              <option value="ai_map">
                Carte créée par IA
              </option>

              <option value="announcement">
                Annonce
              </option>
            </select>
          </label>

          <label style={fieldStyle}>
            <span>Statut</span>

            <select
              value={form.status}
              onChange={(event) =>
                updateForm(
                  "status",
                  event.target
                    .value as PublicationStatus,
                )
              }
              style={inputStyle}
            >
              <option value="draft">
                Brouillon
              </option>

              <option value="published">
                Publier maintenant
              </option>

              <option value="archived">
                Archivé
              </option>
            </select>
          </label>
        </div>

        <LanguageSection
          language="🇨🇦 Français"
          title={form.title_fr}
          body={form.body_fr}
          alt={form.image_alt_fr}
          required
          onTitle={(value) =>
            updateForm(
              "title_fr",
              value,
            )
          }
          onBody={(value) =>
            updateForm(
              "body_fr",
              value,
            )
          }
          onAlt={(value) =>
            updateForm(
              "image_alt_fr",
              value,
            )
          }
        />

        <LanguageSection
          language="🇺🇸 English"
          title={form.title_en}
          body={form.body_en}
          alt={form.image_alt_en}
          onTitle={(value) =>
            updateForm(
              "title_en",
              value,
            )
          }
          onBody={(value) =>
            updateForm(
              "body_en",
              value,
            )
          }
          onAlt={(value) =>
            updateForm(
              "image_alt_en",
              value,
            )
          }
        />

        <LanguageSection
          language="🇪🇸 Español"
          title={form.title_es}
          body={form.body_es}
          alt={form.image_alt_es}
          onTitle={(value) =>
            updateForm(
              "title_es",
              value,
            )
          }
          onBody={(value) =>
            updateForm(
              "body_es",
              value,
            )
          }
          onAlt={(value) =>
            updateForm(
              "image_alt_es",
              value,
            )
          }
        />

        <section style={imageSectionStyle}>
          <h4 style={{ marginTop: 0 }}>
            🖼️ Photo, illustration ou
            carte créée par IA
          </h4>

          {existingImagePath && (
            <p style={existingImageStyle}>
              ✓ Une image est déjà
              associée à ce contenu.
            </p>
          )}

          <input
            type="file"
            accept="image/jpeg,image/png,image/webp,image/gif"
            onChange={(event) =>
              setImageFile(
                event.target.files?.[0] ??
                  null,
              )
            }
          />

          <p style={helpStyle}>
            JPG, PNG, WEBP ou GIF.
            Maximum 10 Mo. Utilisez
            seulement vos propres photos
            ou des images que vous avez
            le droit de publier.
          </p>

          {imageFile && (
            <p style={selectedFileStyle}>
              Fichier choisi :{" "}
              {imageFile.name}
            </p>
          )}
        </section>

        <button
          type="submit"
          disabled={saving}
          style={primaryButtonStyle}
        >
          {saving
            ? "Enregistrement…"
            : editingId
              ? "Enregistrer les modifications"
              : form.status ===
                  "published"
                ? "Publier le contenu"
                : "Enregistrer le brouillon"}
        </button>
      </form>

      <section style={listCardStyle}>
        <h3 style={sectionTitleStyle}>
          Contenus enregistrés
        </h3>

        {contents.length === 0 ? (
          <p>
            Aucun contenu pour
            l’instant.
          </p>
        ) : (
          <div style={contentListStyle}>
            {contents.map(
              (content) => (
                <article
                  key={content.id}
                  style={contentItemStyle}
                >
                  <div>
                    <p
                      style={
                        itemMetaStyle
                      }
                    >
                      {
                        rooms[
                          content.room_key as RoomKey
                        ]?.label
                      }{" "}
                      ·{" "}
                      {
                        content.object_key
                      }
                    </p>

                    <h4
                      style={
                        itemTitleStyle
                      }
                    >
                      {
                        content.title_fr
                      }
                    </h4>

                    <span
                      style={{
                        ...statusStyle,
                        ...(content.status ===
                        "published"
                          ? publishedStyle
                          : content.status ===
                              "archived"
                            ? archivedStyle
                            : draftStyle),
                      }}
                    >
                      {content.status ===
                      "published"
                        ? "Publié"
                        : content.status ===
                            "archived"
                          ? "Archivé"
                          : "Brouillon"}
                    </span>
                  </div>

                  <div
                    style={
                      itemActionsStyle
                    }
                  >
                    <button
                      type="button"
                      onClick={() =>
                        editContent(
                          content,
                        )
                      }
                      style={
                        smallButtonStyle
                      }
                    >
                      Modifier
                    </button>

                    {content.status !==
                      "published" && (
                      <button
                        type="button"
                        onClick={() =>
                          void changeStatus(
                            content,
                            "published",
                          )
                        }
                        style={
                          publishButtonStyle
                        }
                      >
                        Publier
                      </button>
                    )}

                    {content.status ===
                      "published" && (
                      <button
                        type="button"
                        onClick={() =>
                          void changeStatus(
                            content,
                            "draft",
                          )
                        }
                        style={
                          smallButtonStyle
                        }
                      >
                        Retirer
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() =>
                        void changeStatus(
                          content,
                          "archived",
                        )
                      }
                      style={
                        smallButtonStyle
                      }
                    >
                      Archiver
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        void deleteContent(
                          content,
                        )
                      }
                      style={
                        deleteButtonStyle
                      }
                    >
                      Supprimer
                    </button>
                  </div>
                </article>
              ),
            )}
          </div>
        )}
      </section>
    </section>
  );
}

function LanguageSection({
  language,
  title,
  body,
  alt,
  required = false,
  onTitle,
  onBody,
  onAlt,
}: {
  language: string;
  title: string;
  body: string;
  alt: string;
  required?: boolean;
  onTitle: (value: string) => void;
  onBody: (value: string) => void;
  onAlt: (value: string) => void;
}) {
  return (
    <section style={languageSectionStyle}>
      <h4 style={languageTitleStyle}>
        {language}
        {required
          ? " — obligatoire"
          : " — facultatif"}
      </h4>

      <label style={fieldStyle}>
        <span>Titre</span>

        <input
          type="text"
          value={title}
          required={required}
          maxLength={200}
          onChange={(event) =>
            onTitle(
              event.target.value,
            )
          }
          style={inputStyle}
        />
      </label>

      <label style={fieldStyle}>
        <span>Texte</span>

        <textarea
          value={body}
          required={required}
          rows={6}
          onChange={(event) =>
            onBody(
              event.target.value,
            )
          }
          style={textareaStyle}
        />
      </label>

      <label style={fieldStyle}>
        <span>
          Description de l’image
        </span>

        <input
          type="text"
          value={alt}
          maxLength={300}
          placeholder="Décrivez brièvement ce que montre l’image."
          onChange={(event) =>
            onAlt(
              event.target.value,
            )
          }
          style={inputStyle}
        />
      </label>
    </section>
  );
}

function getIdentity(token: string) {
  try {
    const payload = JSON.parse(
      decodeURIComponent(
        window
          .atob(
            token.split(".")[1]
              .replace(/-/g, "+")
              .replace(/_/g, "/"),
          )
          .split("")
          .map(
            (character) =>
              `%${(
                "00" +
                character
                  .charCodeAt(0)
                  .toString(16)
              ).slice(-2)}`,
          )
          .join(""),
      ),
    );

    const email = String(
      payload.email ?? "",
    ).toLowerCase();

    return {
      userId: String(payload.sub),
      name: email.includes("cathy")
        ? "Cathy"
        : email.includes("suzie")
          ? "Suzie"
          : "CWRC Admin",
    };
  } catch {
    return {
      userId: "",
      name: "CWRC Admin",
    };
  }
}

const managerStyle = {
  marginTop: "45px",
  display: "grid",
  gap: "24px",
};

const managerHeaderStyle = {
  display: "flex",
  alignItems: "center",
  gap: "20px",
  padding: "25px",
  borderRadius: "22px",
  background:
    "linear-gradient(145deg,#102A4C,#193C68)",
  color: "#FFFDF8",
};

const largeIconStyle = {
  fontSize: "3.5rem",
};

const eyebrowStyle = {
  margin: "0 0 7px",
  color: "#8A6A3D",
  fontWeight: "bold",
  letterSpacing: ".12em",
  textTransform:
    "uppercase" as const,
  fontSize: ".78rem",
};

const managerTitleStyle = {
  margin: 0,
  fontSize: "2rem",
};

const managerIntroStyle = {
  margin: "8px 0 0",
  color: "#E8D9BC",
};

const lockedStyle = {
  marginTop: "35px",
  padding: "30px",
  borderRadius: "22px",
  textAlign: "center" as const,
  backgroundColor: "#F7F1E6",
  color: "#102A4C",
  border: "1px solid #D8C49A",
};

const messageCardStyle = {
  padding: "25px",
  borderRadius: "22px",
  backgroundColor: "#F7E9BD",
  border: "2px solid #D8C49A",
};

const publisherCardStyle = {
  display: "grid",
  gap: "22px",
  padding: "25px",
  borderRadius: "22px",
  backgroundColor: "#FFFDF8",
  border: "1px solid #D8C49A",
};

const listCardStyle = {
  padding: "25px",
  borderRadius: "22px",
  backgroundColor: "#F7F1E6",
  border: "1px solid #D8C49A",
};

const sectionHeaderStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  justifyContent: "space-between",
  alignItems: "center",
  gap: "12px",
};

const sectionTitleStyle = {
  margin: "4px 0 15px",
  color: "#102A4C",
  fontSize: "1.6rem",
};

const selectionGridStyle = {
  display: "grid",
  gridTemplateColumns:
    "repeat(auto-fit,minmax(210px,1fr))",
  gap: "14px",
};

const fieldStyle = {
  display: "grid",
  gap: "7px",
  color: "#102A4C",
  fontWeight: "bold",
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  padding: "12px",
  borderRadius: "12px",
  border: "1px solid #BDA87C",
  backgroundColor: "white",
  color: "#102A4C",
  fontSize: "1rem",
};

const textareaStyle = {
  ...inputStyle,
  resize: "vertical" as const,
  minHeight: "110px",
  fontFamily: "inherit",
  lineHeight: 1.6,
};

const languageSectionStyle = {
  display: "grid",
  gap: "14px",
  padding: "20px",
  borderRadius: "18px",
  backgroundColor: "#F7F1E6",
  borderTop: "5px solid #8A6A3D",
};

const languageTitleStyle = {
  margin: 0,
  color: "#102A4C",
};

const imageSectionStyle = {
  padding: "20px",
  borderRadius: "18px",
  backgroundColor: "#EEF4FA",
  border: "1px solid #AFC2D5",
};

const existingImageStyle = {
  color: "#244C2D",
  fontWeight: "bold",
};

const helpStyle = {
  color: "#6E5B3F",
  fontSize: ".9rem",
  lineHeight: 1.5,
};

const selectedFileStyle = {
  color: "#244C2D",
  fontWeight: "bold",
};

const currentMessageStyle = {
  margin: "15px 0",
  padding: "16px",
  borderRadius: "15px",
  backgroundColor:
    "rgba(255,255,255,.65)",
  color: "#102A4C",
  lineHeight: 1.6,
};

const primaryButtonStyle = {
  padding: "14px 22px",
  border: 0,
  borderRadius: "999px",
  backgroundColor: "#102A4C",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};

const goldButtonStyle = {
  ...primaryButtonStyle,
  backgroundColor: "#8A6A3D",
};

const secondaryButtonStyle = {
  padding: "9px 14px",
  borderRadius: "999px",
  border: "1px solid #8A6A3D",
  backgroundColor: "transparent",
  color: "#8A6A3D",
  fontWeight: "bold",
  cursor: "pointer",
};

const loadingStyle = {
  padding: "14px",
  borderRadius: "14px",
  backgroundColor: "#EEF4FA",
  color: "#102A4C",
};

const successStyle = {
  padding: "14px",
  borderRadius: "14px",
  backgroundColor: "#E4F4E8",
  color: "#244C2D",
  fontWeight: "bold",
};

const errorStyle = {
  padding: "14px",
  borderRadius: "14px",
  backgroundColor: "#FFF0ED",
  color: "#74372C",
  fontWeight: "bold",
};

const contentListStyle = {
  display: "grid",
  gap: "12px",
};

const contentItemStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  justifyContent: "space-between",
  alignItems: "center",
  gap: "16px",
  padding: "17px",
  borderRadius: "15px",
  backgroundColor: "#FFFDF8",
  border: "1px solid #D8C49A",
};

const itemMetaStyle = {
  margin: "0 0 5px",
  color: "#8A6A3D",
  fontSize: ".8rem",
  fontWeight: "bold",
};

const itemTitleStyle = {
  margin: "0 0 8px",
  color: "#102A4C",
  fontSize: "1.15rem",
};

const statusStyle = {
  display: "inline-block",
  padding: "4px 9px",
  borderRadius: "999px",
  fontSize: ".75rem",
  fontWeight: "bold",
};

const publishedStyle = {
  backgroundColor: "#E4F4E8",
  color: "#244C2D",
};

const draftStyle = {
  backgroundColor: "#FFF2C9",
  color: "#70550C",
};

const archivedStyle = {
  backgroundColor: "#E7E7E7",
  color: "#555",
};

const itemActionsStyle = {
  display: "flex",
  flexWrap: "wrap" as const,
  gap: "7px",
};

const smallButtonStyle = {
  padding: "8px 11px",
  borderRadius: "999px",
  border: "1px solid #8A6A3D",
  backgroundColor: "white",
  color: "#102A4C",
  fontWeight: "bold",
  cursor: "pointer",
};

const publishButtonStyle = {
  ...smallButtonStyle,
  backgroundColor: "#244C2D",
  color: "white",
  borderColor: "#244C2D",
};

const deleteButtonStyle = {
  ...smallButtonStyle,
  backgroundColor: "#74372C",
  color: "white",
  borderColor: "#74372C",
};