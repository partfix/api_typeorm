import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	UpdateDateColumn,
} from "typeorm";
@Entity({ name: "users" }) // The table name
export class User {
	@PrimaryGeneratedColumn("uuid")
	id!: string;

	@Column({ type: "varchar", length: 255, unique: true, nullable: false })
	email!: string;

	@Column({ type: "varchar", length: 50, unique: true, nullable: false })
	username!: string;

	@Column({ type: "varchar", length: 255, nullable: false, select: false })
	passwordHash: string; // hash for security

	@Column({ type: "varchar", length: 10, nullable: false })
	title: string;

	@Column({ type: "varchar", length: 50, nullable: false })
	firstName: string;

	@Column({ type: "varchar", length: 50, nullable: false })
	lastName: string;

	@Column({ type: "varchar", length: 20, nullable: false })
	role: string;

	@CreateDateColumn({
		type: "timestamp",
		precision: 6,
		default: () => "CURRENT_TIMESTAMP(6)",
	})
	createdAt!: Date;

	@UpdateDateColumn({
		type: "timestamp",
		precision: 6,
		default: () => "CURRENT_TIMESTAMP(6)",
		onUpdate: "CURRENT_TIMESTAMP(6)",
	})
	updatedAt!: Date;

	constructor(
		email: string,
		username: string,
		passwordHash: string,
		title: string,
		firstName: string,
		lastName: string,
		role: string
	) {
		this.email = email;
		this.username = username;
		this.passwordHash = passwordHash;
		this.title = title;
		this.firstName = firstName;
		this.lastName = lastName;
		this.role = role;
	}
}
