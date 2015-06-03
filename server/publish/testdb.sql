--
-- PostgreSQL database dump
--

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SET check_function_bodies = false;
SET client_min_messages = warning;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;


--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';


SET search_path = public, pg_catalog;

SET default_tablespace = '';

SET default_with_oids = false;

--
-- Name: AppRoles; Type: TABLE; Schema: public; Owner: david; Tablespace: 
--

CREATE TABLE "AppRoles" (
    id integer NOT NULL,
    "appId" integer NOT NULL,
    name character varying(255),
    description character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."AppRoles" OWNER TO david;

--
-- Name: AppRoles_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

CREATE SEQUENCE "AppRoles_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AppRoles_id_seq" OWNER TO david;

--
-- Name: AppRoles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david
--

ALTER SEQUENCE "AppRoles_id_seq" OWNED BY "AppRoles".id;


--
-- Name: AppUsers; Type: TABLE; Schema: public; Owner: david; Tablespace: 
--

CREATE TABLE "AppUsers" (
    id integer NOT NULL,
    "userId" integer NOT NULL,
    "appId" integer NOT NULL,
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."AppUsers" OWNER TO david;

--
-- Name: AppUsers_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

CREATE SEQUENCE "AppUsers_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."AppUsers_id_seq" OWNER TO david;

--
-- Name: AppUsers_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david
--

ALTER SEQUENCE "AppUsers_id_seq" OWNED BY "AppUsers".id;


--
-- Name: Apps; Type: TABLE; Schema: public; Owner: david; Tablespace: 
--

CREATE TABLE "Apps" (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Apps" OWNER TO david;

--
-- Name: Apps_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

CREATE SEQUENCE "Apps_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Apps_id_seq" OWNER TO david;

--
-- Name: Apps_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david
--

ALTER SEQUENCE "Apps_id_seq" OWNED BY "Apps".id;


--
-- Name: Roles; Type: TABLE; Schema: public; Owner: david; Tablespace: 
--

CREATE TABLE "Roles" (
    id integer NOT NULL,
    name character varying(255),
    description character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Roles" OWNER TO david;

--
-- Name: Roles_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

CREATE SEQUENCE "Roles_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Roles_id_seq" OWNER TO david;

--
-- Name: Roles_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david
--

ALTER SEQUENCE "Roles_id_seq" OWNED BY "Roles".id;


--
-- Name: Users; Type: TABLE; Schema: public; Owner: david; Tablespace: 
--

CREATE TABLE "Users" (
    id integer NOT NULL,
    username character varying(255),
    password character varying(255),
    email character varying(255),
    "firstName" character varying(255),
    "lastName" character varying(255),
    "createdAt" timestamp with time zone NOT NULL,
    "updatedAt" timestamp with time zone NOT NULL
);


ALTER TABLE public."Users" OWNER TO david;

--
-- Name: Users_id_seq; Type: SEQUENCE; Schema: public; Owner: david
--

CREATE SEQUENCE "Users_id_seq"
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public."Users_id_seq" OWNER TO david;

--
-- Name: Users_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: david
--

ALTER SEQUENCE "Users_id_seq" OWNED BY "Users".id;


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: david
--

ALTER TABLE ONLY "AppRoles" ALTER COLUMN id SET DEFAULT nextval('"AppRoles_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: david
--

ALTER TABLE ONLY "AppUsers" ALTER COLUMN id SET DEFAULT nextval('"AppUsers_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: david
--

ALTER TABLE ONLY "Apps" ALTER COLUMN id SET DEFAULT nextval('"Apps_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: david
--

ALTER TABLE ONLY "Roles" ALTER COLUMN id SET DEFAULT nextval('"Roles_id_seq"'::regclass);


--
-- Name: id; Type: DEFAULT; Schema: public; Owner: david
--

ALTER TABLE ONLY "Users" ALTER COLUMN id SET DEFAULT nextval('"Users_id_seq"'::regclass);


--
-- Name: AppRoles_appId_name_key; Type: CONSTRAINT; Schema: public; Owner: david; Tablespace: 
--

ALTER TABLE ONLY "AppRoles"
    ADD CONSTRAINT "AppRoles_appId_name_key" UNIQUE ("appId", name);


--
-- Name: AppRoles_pkey; Type: CONSTRAINT; Schema: public; Owner: david; Tablespace: 
--

ALTER TABLE ONLY "AppRoles"
    ADD CONSTRAINT "AppRoles_pkey" PRIMARY KEY (id);


--
-- Name: AppUsers_pkey; Type: CONSTRAINT; Schema: public; Owner: david; Tablespace: 
--

ALTER TABLE ONLY "AppUsers"
    ADD CONSTRAINT "AppUsers_pkey" PRIMARY KEY (id);


--
-- Name: AppUsers_userId_appId_key; Type: CONSTRAINT; Schema: public; Owner: david; Tablespace: 
--

ALTER TABLE ONLY "AppUsers"
    ADD CONSTRAINT "AppUsers_userId_appId_key" UNIQUE ("userId", "appId");


--
-- Name: Apps_name_key; Type: CONSTRAINT; Schema: public; Owner: david; Tablespace: 
--

ALTER TABLE ONLY "Apps"
    ADD CONSTRAINT "Apps_name_key" UNIQUE (name);


--
-- Name: Apps_pkey; Type: CONSTRAINT; Schema: public; Owner: david; Tablespace: 
--

ALTER TABLE ONLY "Apps"
    ADD CONSTRAINT "Apps_pkey" PRIMARY KEY (id);


--
-- Name: Roles_pkey; Type: CONSTRAINT; Schema: public; Owner: david; Tablespace: 
--

ALTER TABLE ONLY "Roles"
    ADD CONSTRAINT "Roles_pkey" PRIMARY KEY (id);


--
-- Name: Users_pkey; Type: CONSTRAINT; Schema: public; Owner: david; Tablespace: 
--

ALTER TABLE ONLY "Users"
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: AppRoles_appId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY "AppRoles"
    ADD CONSTRAINT "AppRoles_appId_fkey" FOREIGN KEY ("appId") REFERENCES "Apps"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: AppUsers_appId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY "AppUsers"
    ADD CONSTRAINT "AppUsers_appId_fkey" FOREIGN KEY ("appId") REFERENCES "Apps"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: AppUsers_userId_fkey; Type: FK CONSTRAINT; Schema: public; Owner: david
--

ALTER TABLE ONLY "AppUsers"
    ADD CONSTRAINT "AppUsers_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"(id) ON UPDATE CASCADE ON DELETE SET NULL;


--
-- Name: public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;


--
-- PostgreSQL database dump complete
--

